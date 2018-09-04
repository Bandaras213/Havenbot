const snekfetch = require("snekfetch");
const fs = require("fs");

let Datafilter = "data/data.json"

module.exports = async (bot, message, args, Discord, moment) => {

    let user = message.member.user
    const m = await message.channel.send(`${user}, Looking for Character **"${args.join(" ")}"** on Ragnarok... Give me a sec...`);

    if (args.length != 2) {
        return m.edit(`${user}, Invalid or Missing argument! **[Character Name Format: Firstname Lastname]**`), message.react('❌');
    };

    let firstname = args[0].charAt(0).toUpperCase() + args[0].substring(1);
    let lastname = args[1].charAt(0).toUpperCase() + args[1].substring(1);

    await snekfetch.get("https://xivapi.com/character/search?name=" + args.join("%20") + "&server=Ragnarok" + `&key=${bot.config.xivapikey}`).then(async res => {
        if (res.body.Pagination.ResultsTotal === 0) {
            return m.edit(`${user}, Invalid argument! **[Cannot find character "${args.join(" ")}"!]**`), message.react('❌');
        };

        let searchTerm = `${firstname} ${lastname}`;
        let results = res.body.Results;
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

            let MinionFilter = JSON.parse(fs.readFileSync(Datafilter, 'utf8')).Minions.filter(ID => ID.ID == 0);
            let MountFilter = JSON.parse(fs.readFileSync(Datafilter, 'utf8')).Mounts.filter(ID => ID.ID == 1);
            let RaceFilter = JSON.parse(fs.readFileSync(Datafilter, 'utf8')).Races.filter(ID => ID.ID == searCharacter.Race - 1);
            let TribesFilter = JSON.parse(fs.readFileSync(Datafilter, 'utf8')).Tribes.filter(ID => ID.ID == searCharacter.Tribe - 1);
            let GCNameFilter = JSON.parse(fs.readFileSync(Datafilter, 'utf8')).GrandCompanys.filter(ID => ID.ID == searCharacter.GrandCompany.NameID - 1);
            let GCRankFilter = GCNameFilter[0].Ranks.filter(RankID => RankID.RankID == searCharacter.GrandCompany.RankID - 1);

            let Gender
            if (searCharacter.Gender === 1) {
                Gender = "Male"
            } else {
                Gender = "Female"
            };

            let Jobs = [
                //Tanks
                searCharacter.ClassJobs["1_19"], //PLD
                searCharacter.ClassJobs["3_21"], //WAR
                searCharacter.ClassJobs["32_32"], //DRK
                //Healer
                searCharacter.ClassJobs["6_24"], //WHM
                searCharacter.ClassJobs["26_28"], //SCH
                searCharacter.ClassJobs["33_33"], //AST
                //DPS
                searCharacter.ClassJobs["2_20"], //MNK
                searCharacter.ClassJobs["4_22"], //DRG
                searCharacter.ClassJobs["29_30"], //NIN
                searCharacter.ClassJobs["34_34"], //SAM
                searCharacter.ClassJobs["5_23"], //BRD
                searCharacter.ClassJobs["31_31"], //MCH
                searCharacter.ClassJobs["7_25"], //BLM
                searCharacter.ClassJobs["26_27"], //SMN
                searCharacter.ClassJobs["35_35"], //RDM
                //Gathering
                searCharacter.ClassJobs["16_16"], //MIN
                searCharacter.ClassJobs["17_17"], //BTN
                searCharacter.ClassJobs["18_18"], //FSH
                //Crafting
                searCharacter.ClassJobs["8_8"], //CRP
                searCharacter.ClassJobs["9_9"], //BSM
                searCharacter.ClassJobs["10_10"], //ARM
                searCharacter.ClassJobs["11_11"], //GSM
                searCharacter.ClassJobs["12_12"], //LTW
                searCharacter.ClassJobs["13_13"], //WVR
                searCharacter.ClassJobs["14_14"], //ALC
                searCharacter.ClassJobs["15_15"], //CUL

            ];

            let embed = {
                "color": 1981831,
                "thumbnail": {
                    "url": `${searCharacter.Portrait}`
                },
                "author": {
                    "name": `Character Overview of ${searCharacter.Name}`,
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
                    {
                        "name": `Job Overview of ${searCharacter.Name}`,
                        "value": "¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯"
                    },
                    {
                        "name": "Disciples of War",
                        "value": "¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯"
                    },
                    {
                        "name": "__Tanks__",
                        "value": `**PLD:** ${Jobs[0].Level}, **WAR:** ${Jobs[1].Level}, **DRK:** ${Jobs[2].Level}`
                    },
                    {
                        "name": "__DPS__",
                        "value": `**MNK:** ${Jobs[6].Level}, **DRG:** ${Jobs[7].Level}, **NIN:** ${Jobs[8].Level}, **SAM:** ${Jobs[9].Level}, **BRD:** ${Jobs[10].Level}, **MCH:** ${Jobs[11].Level}`
                    },
                    {
                        "name": "Disciples of Magic",
                        "value": "¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯"
                    },
                    {
                        "name": "__Healers__",
                        "value": `**WHM:** ${Jobs[3].Level}, **SCH:** ${Jobs[4].Level}, **AST:** ${Jobs[5].Level}`
                    },
                    {
                        "name": "__DPS__",
                        "value": `**BLM:** ${Jobs[12].Level}, **SMN:** ${Jobs[13].Level}, **RDM:** ${Jobs[14].Level}`
                    },
                    {
                        "name": "Disciples of Land & Hand",
                        "value": "¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯"
                    },
                    {
                        "name": "__Gathering__",
                        "value": `**MIN:** ${Jobs[15].Level}, **BTN:** ${Jobs[16].Level}, **FSH:** ${Jobs[17].Level}`
                    },
                    {
                        "name": "__Crafting__",
                        "value": `**CRP:** ${Jobs[18].Level}, **BSM:** ${Jobs[19].Level}, **ARM:** ${Jobs[20].Level}, **GSM:** ${Jobs[21].Level}, **LTW:** ${Jobs[22].Level}, **WVR:** ${Jobs[23].Level}, **ALC:** ${Jobs[24].Level}, **CUL:** ${Jobs[25].Level}`
                    },
                ]
            };

            await m.edit({ embed: embed });
            await message.react('✅');
        });

    });
};
