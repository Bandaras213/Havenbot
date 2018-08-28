//this is just here until I make it update itself once a month or so

const snekfetch = require("snekfetch");
const fs = require("fs");
module.exports = (bot, message, args, Discord, moment) => {

    if (message.member.user.id == bot.config.ownerID) {
        snekfetch.get("https://xivapi.com/Companion" + `?key=${bot.config.xivapikey}`).then(async res => {
            let MinTotal = res.body.pagination.results_total

            let MinionJ = JSON.parse(fs.readFileSync("./data/mountsminions.json", 'utf8'));
            var MinionFilter = MinionJ.Minions.filter(ID => ID.ID == 0);
            if (MinionFilter[0].MinionTotal === MinTotal) {
                return;
            } else {
                MinionJ["Minions"] = [{
                    ID: 0,
                    MinionTotal: MinTotal
                }]
            };

            await fs.writeFile("./data/mountsminions.json", JSON.stringify(MinionJ, null, 2), 'utf8', (err) => {
                if (err) bot.log("Unable to write file", "Error");
            });
        });

        snekfetch.get("https://xivapi.com/Mount" + `?key=${bot.config.xivapikey}`).then(async res => {
            let MouTotal = res.body.pagination.results_total

            let MountJ = JSON.parse(fs.readFileSync("./data/mountsminions.json", 'utf8'));
            var MountFilter = MountJ.Mounts.filter(ID => ID.ID == 1);
            if (MountFilter[0].MountTotal === MouTotal) {
                return;
            } else {
                MountJ["Mounts"] = [{
                    ID: 1,
                    MountTotal: MouTotal
                }]
            };

            await fs.writeFile("./data/mountsminions.json", JSON.stringify(MountJ, null, 2), 'utf8', (err) => {
                if (err) bot.log("Unable to write file", "Error");
            });
        });

        message.delete(), message.channel.send("Mount and Minion Total should now be updated!");
    } else {
        return message.delete(), message.reply(`You dont have permission to use this command!`);
    };
};