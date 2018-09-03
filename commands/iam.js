const snekfetch = require("snekfetch");
const fs = require("fs");

module.exports = async (bot, message, args, Discord) => {

    let user = message.member.user
    const m = await message.channel.send(`${user}, Looking for Character **"${args.join(" ")}"** on Ragnarok... Give me a sec...`);

    if (!message.member.roles.some(r => ["Visitor",].includes(r.name))) {
        return m.edit(`${user}, It looks like you already verified yourself! For a Namechange please ask an Sergeant (or higher)!`), message.react('❌');
    };

    if (!args[0]) {
        return m.edit(`${user}, Missing argument! **[Character Name]**`), message.react('❌');
    };
    if (!args[1]) {
        return m.edit(`${user}, Invalid argument! **[Character Name Format: Firstname Lastname]**`), message.react('❌');
    };
    if (args.length > 2) {
        return m.edit(`${user}, Invalid argument! **[Character Name Format: Firstname Lastname]**`), message.react('❌');
    };

    let firstname = args[0].charAt(0).toUpperCase() + args[0].substring(1);
    let lastname = args[1].charAt(0).toUpperCase() + args[1].substring(1);

    snekfetch.get("https://xivapi.com/character/search?name=" + args.join("%20") + "&server=Ragnarok" + `&key=${bot.config.xivapikey}`).then(async res => {
        if (res.body.Pagination.ResultsTotal === 0) {
            return m.edit(`${user}, Invalid argument! **[Cannot find character "${args.join(" ")}"!]**`), message.react('❌');
        };

        var searchTerm = `${firstname} ${lastname}`;
        var results = res.body.Results;
        var lodeID = results.filter(function (results) {
            return results.Name.indexOf(searchTerm) > -1;
        });

        if (lodeID[0] === undefined) {
            return m.edit(`${user}, Invalid argument! **[Cannot find character "${args.join(" ")}"!]**`), message.react('❌');
        };

        await snekfetch.get("https://xivapi.com/freecompany/9237023573225331624?data=FCM" + `&key=${bot.config.xivapikey}`).then(async sear => {
            var RecRole = message.member.guild.roles.find(r => r.name === "Recruit");
            var FetRole

            if (!sear.body.Info.FreeCompany.State === 2) {
                FetRole = RecRole
            };
            if (!sear.body.Info.FreeCompanyMembers.State === 2) {
                FetRole = RecRole
            };

            let searPayload = sear.body.FreeCompanyMembers
            let searPayloadFilter = searPayload.filter(ID => ID.ID == lodeID[0].ID);
            if (searPayloadFilter[0]) {
                FetRole = message.member.guild.roles.find(r => r.name === `${searPayloadFilter[0].Rank}`)
            } else {
                FetRole = RecRole
            };

            let embed = {
                "color": 65280,
                "thumbnail": {
                    "url": `${lodeID[0].Avatar}`
                },
                "author": {
                    "name": `${lodeID[0].Name} is now Verified!`,
                    "icon_url": `${lodeID[0].Avatar}`,
                    "url": `https://eu.finalfantasyxiv.com/lodestone/character/${lodeID[0].ID}`,
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
                        "name": "Lodestone ID:",
                        "value": `${lodeID[0].ID}`,
                        "inline": true
                    },
                    {
                        "name": "Lodestone Link:",
                        "value": `[Click Me](https://eu.finalfantasyxiv.com/lodestone/character/${lodeID[0].ID})`,
                        "inline": true
                    },
                ]
            };

            await message.member.setNickname(`${lodeID[0].Name}`);
            await message.member.removeRole(message.member.guild.roles.find(r => r.name === "Visitor"));
            await message.member.addRole(FetRole);
            await m.edit({ embed });
            await message.react('✅');


        });
    });
};
