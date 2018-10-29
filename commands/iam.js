const snekfetch = require("snekfetch");
const ms = require("ms");

module.exports = async (bot, message, args, Discord) => {

    //send message to confirm input
    const m = await message.channel.send(`${user}, Looking for Character **"${args.join(" ")}"** on Ragnarok... Give me a sec...`);

    let user = message.member.user

    //check if the member has the visitor role, if not return
    if (!message.member.roles.some(r => ["Visitor",].includes(r.name))) {
        return m.edit(`${user}, You already verified yourself! For a Namechange please ask an Sergeant (or higher)!`), message.react('❌');
    };

    //check if the given character name is in a valid format
    if (args.length != 2) {
        return m.edit(`${user}, Invalid or Missing argument! **[Character Name Format: Firstname Lastname]**`), message.react('❌'),
            setTimeout(() => {
                message.delete();
                m.delete()
            }, ms("30s"));
    };

    //capitalize the fist letter of first and last name
    let firstname = args[0].charAt(0).toUpperCase() + args[0].substring(1);
    let lastname = args[1].charAt(0).toUpperCase() + args[1].substring(1);

    try {

        //searching for the given character on ragnarok
        await snekfetch.get("https://xivapi.com/character/search?name=" + args.join("%20") + "&server=Ragnarok" + `&key=${bot.config.xivapikey}`).then(async res => {

            //check and return if no character could be found with the given name
            if (res.body.Pagination.ResultsTotal === 0) {
                return m.edit(`${user}, Invalid argument! **[Cannot find character "${args.join(" ")}"!]**`), message.react('❌'),
                    setTimeout(() => {
                        message.delete();
                        m.delete()
                    }, ms("30s"));
            };

            //search the results for the 1:1 match since multiple hits are possible
            let searchTerm = `${firstname} ${lastname}`;
            let results = res.body.Results;
            let lodeID = results.filter(results => {
                return results.Name.indexOf(searchTerm) > -1;
            });

            //check if the first character exists just to be sure
            if (lodeID[0] === undefined) {
                return m.edit(`${user}, Invalid argument! **[Cannot find character "${args.join(" ")}"!]**`), message.react('❌'),
                    setTimeout(() => {
                        message.delete();
                        m.delete()
                    }, ms("30s"));
            };

            //get free company with free company member data
            await snekfetch.get("https://xivapi.com/freecompany/9237023573225331624?data=FCM" + `&key=${bot.config.xivapikey}`).then(async sear => {

                let RecRole = message.member.guild.roles.find(r => r.name === "Recruit");
                let FetRole

                //if the free company or its members aren't cached use the recrole as the fet(ched)role
                if (!sear.body.Info.FreeCompany.State === 2) {
                    FetRole = RecRole
                };
                if (!sear.body.Info.FreeCompanyMembers.State === 2) {
                    FetRole = RecRole
                };

                //search the fc members for the ID of the character
                let searPayload = sear.body.FreeCompanyMembers
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
                m.delete()
            }, ms("30s"));
    };
};
