const snekfetch = require("snekfetch");
const fs = require("fs");
const Canvas = require('canvas');

const applyText = (canvas, text, fontsize, style) => {
    const ctx = canvas.getContext('2d');

    do {
        ctx.font = `${style} ${fontsize -= 2}px Arial`;
    } while (ctx.measureText(text).width > 245);
    return ctx.font;
};

let Datafilter = "data/data.json"

module.exports = async (bot, message, args, Discord, moment) => {

    let user = message.member.user
    const m = await message.channel.send(`${user}, Looking for Character **"${args.join(" ")}"** on Ragnarok... Give me a sec...`);

    if (args.length != 2) {
        return m.edit(`${user}, Invalid or Missing argument! **[Character Name Format: Firstname Lastname]**`), message.react('❌');
    };

    let firstname = args[0].charAt(0).toUpperCase() + args[0].substring(1);
    let lastname = args[1].charAt(0).toUpperCase() + args[1].substring(1);

    try {
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

                let titleID
                if (searCharacter.Title == null) {
                    titleID = 0
                } else {
                    titleID = searCharacter.Title;
                };

                await snekfetch.get(`https://xivapi.com/Title/` + `${titleID}` + `?key=${bot.config.xivapikey}`).then(async apititle => {

                    let title
                    if (searCharacter.Gender === 1) {
                        title = apititle.body.Name
                    } else {
                        title = apititle.body.NameFemale
                    };

                    const canvas = Canvas.createCanvas(400, 300);
                    const ctx = canvas.getContext('2d');

                    const { body: buffer } = await snekfetch.get(searCharacter.Portrait);
                    const portrait = await Canvas.loadImage(buffer);
                    ctx.drawImage(portrait, -33, 0, 220, canvas.height);

                    const background = await Canvas.loadImage('./img/JobLevelImage.png');
                    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                    //Server (Hardcoded lel)
                    ctx.font = applyText(canvas, 'Ragnarok (Chaos)', 13);
                    ctx.fillStyle = '#bbbbbb';
                    ctx.textAlign = "center";
                    ctx.fillText('Ragnarok (Chaos)', canvas.width / 1.437, 20);

                    //Character Name
                    ctx.font = applyText(canvas, searCharacter.Name, 22, "bold");
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText(searCharacter.Name, canvas.width / 1.437, 40);

                    //Title
                    ctx.font = applyText(canvas, `${title}`, 18);
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText(`${title}`, canvas.width / 1.437, 59);

                    //Tribe + Race
                    ctx.font = applyText(canvas, `${TribesFilter[0].Name} ${RaceFilter[0].Name}`, 13);
                    ctx.fillStyle = '#bbbbbb';
                    ctx.fillText(`${TribesFilter[0].Name} ${RaceFilter[0].Name}`, canvas.width / 1.437, 74);

                    //Grand Company + Rank
                    const GCIcon = await Canvas.loadImage(`${GCNameFilter[0].Icon}`);
                    const GCRankIcon = await Canvas.loadImage(`${GCRankFilter[0].Icon}`);
                    ctx.drawImage(GCIcon, 262, 86, 35, 35);
                    ctx.drawImage(GCRankIcon, 322, 86, 35, 35);

                    //Guardian Deity
                    const GuardianD = await Canvas.loadImage(`./img/GuardianDeitys/${searCharacter.GuardianDeity}.png`);
                    ctx.drawImage(GuardianD, 208, 89, 28, 28);

                    //Mount % + Minions %
                    ctx.font = applyText(canvas, `Mounts: ${parseFloat((100 * searCharacter.Mounts.length) / MountFilter[0].MountTotal).toFixed(2)}%    Minions: ${parseFloat((100 * searCharacter.Minions.length) / MinionFilter[0].MinionTotal).toFixed(2)}%`, 14);
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText(`Mounts: ${parseFloat((100 * searCharacter.Mounts.length) / MountFilter[0].MountTotal).toFixed(2)}%    Minions: ${parseFloat((100 * searCharacter.Minions.length) / MinionFilter[0].MinionTotal).toFixed(2)}%`, canvas.width / 1.437, 135);

                    //Jobs
                    ctx.font = "13px Arial"
                    ctx.fillStyle = '#ffffff';

                    //DPS
                    //SAM
                    ctx.fillText(`${Jobs[9].Level}`, canvas.width / 2.28, 175);
                    //NIN
                    ctx.fillText(`${Jobs[8].Level}`, canvas.width / 2, 175);
                    //MNK
                    ctx.fillText(`${Jobs[6].Level}`, canvas.width / 1.76, 175);
                    //DRG
                    ctx.fillText(`${Jobs[7].Level}`, canvas.width / 1.585, 175);
                    //MCH
                    ctx.fillText(`${Jobs[11].Level}`, canvas.width / 1.43, 175);
                    //BRD
                    ctx.fillText(`${Jobs[10].Level}`, canvas.width / 1.315, 175);
                    //RDM
                    ctx.fillText(`${Jobs[14].Level}`, canvas.width / 1.211, 175);
                    //SMN
                    ctx.fillText(`${Jobs[13].Level}`, canvas.width / 1.12, 175);
                    //BLM
                    ctx.fillText(`${Jobs[12].Level}`, canvas.width / 1.045, 175);

                    //TANKS
                    //PLD    
                    ctx.fillText(`${Jobs[0].Level}`, canvas.width / 2.05, 213);
                    //WAR
                    ctx.fillText(`${Jobs[1].Level}`, canvas.width / 1.81, 213);
                    //DRK
                    ctx.fillText(`${Jobs[2].Level}`, canvas.width / 1.62, 213);

                    //HEALER
                    //WHM  
                    ctx.fillText(`${Jobs[3].Level}`, canvas.width / 1.33, 213);
                    //SCH
                    ctx.fillText(`${Jobs[4].Level}`, canvas.width / 1.227, 213);
                    //AST
                    ctx.fillText(`${Jobs[5].Level}`, canvas.width / 1.138, 213);

                    //CRAFTERS
                    //CRP
                    ctx.fillText(`${Jobs[18].Level}`, canvas.width / 2.15, 250);
                    //ARM
                    ctx.fillText(`${Jobs[20].Level}`, canvas.width / 1.91, 250);
                    //BSM
                    ctx.fillText(`${Jobs[19].Level}`, canvas.width / 1.7, 250);
                    //GSM
                    ctx.fillText(`${Jobs[21].Level}`, canvas.width / 1.524, 250);
                    //LTW
                    ctx.fillText(`${Jobs[22].Level}`, canvas.width / 1.385, 250);
                    //WVR
                    ctx.fillText(`${Jobs[23].Level}`, canvas.width / 1.27, 250);
                    //ALC
                    ctx.fillText(`${Jobs[24].Level}`, canvas.width / 1.175, 250);
                    //CUL
                    ctx.fillText(`${Jobs[25].Level}`, canvas.width / 1.09, 250);

                    //GATHERER
                    //MIN
                    ctx.fillText(`${Jobs[15].Level}`, canvas.width / 1.595, 288);
                    //BTN
                    ctx.fillText(`${Jobs[16].Level}`, canvas.width / 1.447, 288);
                    //FSH
                    ctx.fillText(`${Jobs[17].Level}`, canvas.width / 1.32, 288);

                    const attachment = new Discord.Attachment(canvas.toBuffer(), `${searCharacter.ID}.png`);
                    await m.delete();
                    await message.channel.send(attachment);
                    //await m.edit({ embed: embed });
                    await message.react('✅');
                });
            });
        });
    } catch (error) {
        bot.log(error, "Error");
        m.edit(`${user}, Something went wrong while requesting API data, Try again in a few minutes!`), message.react('❌');
    };
};
