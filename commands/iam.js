const fetch = require("node-fetch");
const ms = require("ms");

module.exports = async (bot, message, args, Discord) => {

    let user = message.member.user
    const m = await message.channel.send(`${user}, Looking for Character **"${args.join(" ")}"** on Ragnarok... Give me a sec...`);

    if (!message.member.roles.some(r => ["Visitor",].includes(r.name))) {
        return m.edit(`${user}, You already verified yourself! For a Namechange please ask an Sergeant (or higher)!`), message.react('❌');
    };

    if (args.length != 2) {
        return m.edit(`${user}, Invalid or Missing argument! **[Character Name Format: Firstname Lastname]**`), message.react('❌'),
            setTimeout(() => {
                message.delete();
                m.delete()
            }, ms("30s"));
    };

    let firstname = args[0].charAt(0).toUpperCase() + args[0].substring(1);
    let lastname = args[1].charAt(0).toUpperCase() + args[1].substring(1);

    try {
        await fetch("https://xivapi.com/character/search?name=" + args.join("%20") + "&server=Ragnarok" + `&key=${bot.config.xivapikey}`)
          .then(res => res.json())
          .then(async res => {
            if (res.Pagination.ResultsTotal === 0) {
                return m.edit(`${user}, Invalid argument! **[Cannot find character "${args.join(" ")}"!]**`), message.react('❌'),
                    setTimeout(() => {
                        message.delete();
                        m.delete()
                    }, ms("30s"));
            };

            var searchTerm = `${firstname} ${lastname}`;
            var results = res.Results;
            var lodeID = results.filter(function (results) {
                return results.Name.indexOf(searchTerm) > -1;
            });

            if (lodeID[0] === undefined) {
                return m.edit(`${user}, Invalid argument! **[Cannot find character "${args.join(" ")}"!]**`), message.react('❌'),
                    setTimeout(() => {
                        message.delete();
                        m.delete()
                    }, ms("30s"));
            };

            await fetch("https://xivapi.com/freecompany/9237023573225331624?data=FCM" + `&key=${bot.config.xivapikey}`)
              .then(sear => sear.json())
              .then(async sear => {
                var RecRole = message.member.guild.roles.find(r => r.name === "Recruit");
                var FetRole

                if (!sear.Info.FreeCompany.State === 2) {
                    FetRole = RecRole
                };
                if (!sear.Info.FreeCompanyMembers.State === 2) {
                    FetRole = RecRole
                };

                let searPayload = sear.FreeCompanyMembers
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
                await message.member.guild.channels.find(c => c.name === "main").send(`Please Welcome ${message.member.user} to the ${message.member.guild} Discord! <:Haven:430425064589230082>`, { embed });
                await message.delete();
                await m.delete();
            });
        });
    } catch (error) {
        bot.log(error, "Error");
        m.edit(`${user}, Something went wrong while requesting API data, Try again in a few minutes!`), message.react('❌'),
            setTimeout(() => {
                message.delete();
                m.delete()
            }, ms("30s"));
    };
};
