const fetch = require("node-fetch");
const ms = require("ms");
const fs = require("fs");
let CharDB = "data/characters.json"

module.exports = async (bot, message, args, Discord) => {

    let user = message.member.user

    //send message to confirm input
    const m = await message.channel.send(`${user}, Looking for Character **"${args.join(" ")}"** on Ragnarok... Give me a sec...`);

    //check if the user already has a entry in the CharDB
    let CharDBobj = JSON.parse(fs.readFileSync(CharDB, 'utf8'));
    let finddiscid = CharDBobj.characters.find(did => did.discid == user.id);

    if (finddiscid == user.id) {
        return m.edit(`${user}, Looks like you already verified yourself! For Namechanges please use **.updateme** or delete your linked char with **.delchar**!`), message.react('❌');
    };

    //check if the given character name is in a valid format
    if (args.length != 2) {
        return m.edit(`${user}, Invalid or Missing argument! **[Character Name Format: Firstname Lastname]**`), message.react('❌'),
            setTimeout(() => {
                message.delete();
                m.delete();
            }, ms("30s"));
    };

    //capitalize the fist letter of first and last name
    let firstname = bot.caps(args[0]);
    let lastname = bot.caps(args[1]);

    try {
        //searching for the given character on ragnarok
        await fetch("https://xivapi.com/character/search?name=" + args.join("%20") + "&server=Ragnarok" + `&key=${bot.config.xivapikey}`)
            .then(res => res.json())
            .then(async res => {
                //check and return if no character could be found with the given name
                if (res.Pagination.ResultsTotal === 0) {
                    return m.edit(`${user}, Invalid argument! **[Cannot find character "${args.join(" ")}"!]**`), message.react('❌'),
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, ms("30s"));
                };

                //search the results for the 1:1 match since multiple hits are possible
                let searchTerm = `${firstname} ${lastname}`;
                let results = res.Results;
                let lodeID = results.filter(results => {
                    return results.Name.indexOf(searchTerm) > -1;
                });

                //check if the first character exists just to be sure
                if (lodeID[0] === undefined) {
                    return m.edit(`${user}, Invalid argument! **[Cannot find character "${args.join(" ")}"!]**`), message.react('❌'),
                        setTimeout(() => {
                            message.delete();
                            m.delete();
                        }, ms("30s"));
                };

                //save the users discord and lodestone ids if there is no entry for those ids already
                let findlodeid = CharDBobj.characters.find(lid => lid.lodeid == lodeID[0].ID);

                if (finddiscid == undefined && findlodeid) {
                    return m.edit(`${user}, Are you sure that's you? **[Character claimed by another User!]**`), message.react('❌');
                };

                if (finddiscid && findlodeid == undefined) {
                    return m.edit(`${user}, Looks like you already claimed a diffrent Character! Use the existing one or delete your linked char with **.delchar**! **[User claimed a diffrent Character!]**`), message.react('❌');
                };

                if (finddiscid == undefined && findlodeid == undefined) {
                    CharDBobj["characters"].push(
                        {
                            discid: user.id,
                            lodeid: `${lodeID[0].ID}`
                        });

                    fs.writeFile(CharDB, JSON.stringify(CharDBobj, null, 2), 'utf8', (err) => {
                        if (err) bot.log("Unable to write file", "Error");
                    });
                };

                //get free company with free company member data
                await fetch("https://xivapi.com/freecompany/9237023573225331624?data=FCM" + `&key=${bot.config.xivapikey}`)
                    .then(sear => sear.json())
                    .then(async sear => {
                        let RecRole = message.member.guild.roles.find(r => r.name === "Recruit");
                        let FetRole

                        //if the free company or its members aren't cached use the recrole as the fet(ched)role
                        if (!sear.Info.FreeCompany.State === 2) {
                            FetRole = RecRole
                        };
                        if (!sear.Info.FreeCompanyMembers.State === 2) {
                            FetRole = RecRole
                        };

                        //search the fc members for the ID of the character
                        let searPayload = sear.FreeCompanyMembers
                        let searPayloadFilter = searPayload.filter(ID => ID.ID == lodeID[0].ID);

                        //if theres a character with the ID in the fc use the rank name as the fetrole, if not use the recruit role
                        if (searPayloadFilter[0]) {
                            FetRole = message.member.guild.roles.find(r => r.name === `${searPayloadFilter[0].Rank}`)
                        } else {
                            FetRole = RecRole
                        };

                        //define embed
                        let embed = {
                            "color": 65280,
                            "thumbnail": {
                                "url": `${lodeID[0].Avatar}`
                            },
                            "author": {
                                "name": `${lodeID[0].Name} is now verified as a ${FetRole.name}!`,
                            },
                            "fields": [
                                {
                                    "name": "Ingame Name:",
                                    "value": `${lodeID[0].Name}`,
                                    "inline": true
                                },
                                {
                                    "name": "Discord Tag:",
                                    "value": `${message.member.user.tag}`,
                                    "inline": true
                                },
                                {
                                    "name": "FC Rank:",
                                    "value": `${FetRole.name}`,
                                    "inline": true
                                },
                                {
                                    "name": "Lodestone Link:",
                                    "value": `[Click Me](https://eu.finalfantasyxiv.com/lodestone/character/${lodeID[0].ID})`,
                                    "inline": true
                                },
                            ]
                        };

                        //change the nickname of the user, remove the visitor role, give them the correct role, send the welcome embed to #main and delete the original messages
                        await message.member.setNickname(`${lodeID[0].Name}`);
                        await message.member.removeRole(message.member.guild.roles.find(r => r.name === "Visitor"));
                        await message.member.addRole(FetRole);
                        await message.member.guild.channels.find(c => c.name === "main").send(`Please Welcome ${message.member.user} to the ${message.member.guild} Discord! <:Haven:430425064589230082>`, { embed });
                        await message.delete();
                        await m.delete();
                    });
            });

        //catching api errors such as the very cool "Error 500: Internal Server Error" which basically means the lodestone parser broke
    } catch (error) {
        bot.log(error, "Error");
        m.edit(`${user}, Something went wrong while requesting API data, Try again in a few minutes!`), message.react('❌'),
            setTimeout(() => {
                message.delete();
                m.delete();
            }, ms("30s"));
    };
};
