const snekfetch = require("snekfetch");
const fs = require("fs");

module.exports = async (bot, message, args, Discord, moment) => {

    let user = message.member.user
    const m = await message.channel.send(`${user}, Looking for Character **"${args.join(" ")}"** on Ragnarok... Give me a sec...`);

    if (!args[0]) {
        return m.edit(`${user}, Missing argument! **[Character Name]**`), message.react('❌');
    };

    if (!args[1]) {
        return message.reply(`${user}, Invalid argument! **[Character Name Format: Firstname Lastname]**`), message.react('❌');
    };

    let firstname = args[0].charAt(0).toUpperCase() + args[0].substring(1);
    let lastname = args[1].charAt(0).toUpperCase() + args[1].substring(1);

    snekfetch.get("https://xivapi.com/character/search?name=" + args.join("%20") + "&server=Ragnarok" + `&key=${bot.config.xivapikey}`).then(async res => {
        if (res.body.Total === 0) {
            return m.edit(`${user}, Invalid argument! **[Cannot find character "${args.join(" ")}"!]**`), message.react('❌');
        };

        let searchTerm = `${firstname} ${lastname}`;
        let results = res.body.Characters;
        let lodeID = results.filter(function (results) {
            return results.Name.indexOf(searchTerm) > -1;
        });

        if (lodeID[0] === undefined) {
            return m.edit(`${user}, Invalid argument! **[Cannot find character "${args.join(" ")}"!]**`), message.react('❌');
        };

        await snekfetch.get("https://xivapi.com/character/" + lodeID[0].ID + `?key=${bot.config.xivapikey}`).then(async sear => {
            if (sear.body.Info.Character.State === 0) {
                return m.edit(`${user}, Character **"${args.join(" ")}"** is not in database and cannot be added? This shouldn't happen! Please message A'rata Kokonoe`), message.react('❌');
            };
            if (sear.body.Info.Character.State === 1) {
                return m.edit(`${user}, Character **"${args.join(" ")}"** has been added to the database! Try again in a few minutes`), message.react('🔁');
            };
            if (sear.body.Info.Character.State === 3) {
                return m.edit(`${user}, Character **"${args.join(" ")}"** does not exist on The Lodestone? This shouldn't happen! Please message A'rata Kokonoe`), message.react('❌');
            };
            if (sear.body.Info.Character.State === 4) {
                return m.edit(`${user}, The owner of character **"${args.join(" ")}"** has requested it to be blacklisted. No data can be obtained via the API!`), message.react('❌');
            };
            if (sear.body.Info.Character.State === 5) {
                return m.edit(`${user}, The owner of character **"${args.join(" ")}"** has set their profile to Private. Please ask them to make their profile public!`), message.react('❌');
            };

            let searCharacter = sear.body.Character;

            let MinionFilter = JSON.parse(fs.readFileSync("./data/mountsminions.json", 'utf8')).Minions.filter(ID => ID.ID == 0);
            let MountFilter = JSON.parse(fs.readFileSync("./data/mountsminions.json", 'utf8')).Mounts.filter(ID => ID.ID == 1);
            let RaceFilter = JSON.parse(fs.readFileSync("./data/races.json", 'utf8')).Races.filter(ID => ID.ID == searCharacter.Race - 1);
            let TribesFilter = JSON.parse(fs.readFileSync("./data/races.json", 'utf8')).Tribes.filter(ID => ID.ID == searCharacter.Tribe - 1);
            let GCNameFilter = JSON.parse(fs.readFileSync("./data/grandcompanys.json", 'utf8')).GrandCompanys.filter(ID => ID.ID == searCharacter.GrandCompany.NameID - 1);
            let GCRankFilter = GCNameFilter[0].Ranks.filter(RankID => RankID.RankID == searCharacter.GrandCompany.RankID - 1);

            let Gender
            if (searCharacter.Gender === 1) {
                Gender = "Male"
            } else {
                Gender = "Female"
            };

            let embed = {
                "color": 1981831,
                "thumbnail": {
                    "url": `${searCharacter.Portrait}`
                },
                "author": {
                    "name": `Overview of ${searCharacter.Name}`,
                    "icon_url": `${searCharacter.Avatar}`,
                    "url": `https://eu.finalfantasyxiv.com/lodestone/character/${searCharacter.ID}`,
                },
                "fields": [
                    {
                        "name": "Server:",
                        "value": `${searCharacter.Server} (Chaos)`,
                        "inline": true
                    },
                    {
                        "name": "Name:",
                        "value": `${searCharacter.Name}`,
                        "inline": true
                    },
                    {
                        "name": "Race:",
                        "value": `${Gender} ${RaceFilter[0].Name}`,
                        "inline": true
                    },
                    {
                        "name": "Tribe:",
                        "value": `${TribesFilter[0].Name}`,
                        "inline": true
                    },
                    {
                        "name": "Grand Company:",
                        "value": `${GCNameFilter[0].Name}`,
                        "inline": true
                    },
                    {
                        "name": "Grand Company Rank:",
                        "value": `${GCRankFilter[0].Name}`,
                        "inline": true
                    },
                    {
                        "name": "Mounts:",
                        "value": `${searCharacter.Mounts.length} out of ${MountFilter[0].MountTotal} (${parseFloat((100 * searCharacter.Mounts.length) / MountFilter[0].MountTotal).toFixed(2)}%)`,
                        "inline": true
                    },
                    {
                        "name": "Minions",
                        "value": `${searCharacter.Minions.length} out of ${MinionFilter[0].MinionTotal} (${parseFloat((100 * searCharacter.Minions.length) / MinionFilter[0].MinionTotal).toFixed(2)}%)`,
                        "inline": true
                    },
                    {
                        "name": "Lodestone ID:",
                        "value": `${searCharacter.ID}`,
                        "inline": true
                    },
                    {
                        "name": "Lodestone Link:",
                        "value": `[Click Me](https://eu.finalfantasyxiv.com/lodestone/character/${searCharacter.ID})`,
                        "inline": true
                    },
                ]
            };


            await m.edit({ embed });
            await message.react('✅');
        });

    });
};