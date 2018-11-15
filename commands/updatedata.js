const fetch = require("node-fetch");
const fs = require("fs");
let Datafilter = "data/data.json"

module.exports = async (bot, message, args, Discord, moment) => {

    //check for permission to execute command
    if (message.author.id == bot.config.ownerID) {

        message.delete();
        var m = await message.channel.send("Getting Minion and Mount data... Give me a sec...");

        //get minion data
        fetch("https://xivapi.com/Companion" + `?key=${bot.config.xivapikey}`)
            .then(res => res.json())
            .then(async res => {
                let MinTotal = res.Pagination.ResultsTotal
                let MinionJ = JSON.parse(fs.readFileSync(Datafilter, 'utf8'));
                var MinionFilter = MinionJ.Minions.filter(ID => ID.ID == 0);
                setTimeout(() => {
                    m.edit(`Getting Minion Data...\n\n**Minions Before:** ${MinionFilter[0].MinionTotal}\n**Minions After:** ${MinTotal}`);
                }, 2000);

                //check if the miniontotal is the same as in the json, if not update the json
                if (MinionFilter[0].MinionTotal !== MinTotal) {
                    MinionJ["Minions"] = [{
                        ID: 0,
                        MinionTotal: MinTotal
                    }];
                };

                await fs.writeFile(Datafilter, JSON.stringify(MinionJ, null, 2), 'utf8', (err) => {
                    if (err) bot.log("Unable to write file", "Error");
                });

                //get mount data
                await fetch("https://xivapi.com/Mount" + `?key=${bot.config.xivapikey}`)
                    .then(res => res.json())
                    .then(async res => {

                        let MouTotal = res.Pagination.ResultsTotal
                        let MountJ = JSON.parse(fs.readFileSync(Datafilter, 'utf8'));
                        var MountFilter = MountJ.Mounts.filter(ID => ID.ID == 1);
                        setTimeout(() => {
                            m.edit(`Getting Mount Data...\n\n**Minions Before:** ${MinionFilter[0].MinionTotal}\n**Minions After:** ${MinTotal}\n\n**Mounts Before:** ${MountFilter[0].MountTotal}\n**Mounts After:** ${MouTotal}`);
                        }, 4000);
                        //check if the mounttotal is the same as in the json, if not update the json
                        if (MountFilter[0].MountTotal !== MouTotal) {
                            MountJ["Mounts"] = [{
                                ID: 1,
                                MountTotal: MouTotal
                            }];
                        };

                        await fs.writeFile(Datafilter, JSON.stringify(MountJ, null, 2), 'utf8', (err) => {
                            if (err) bot.log("Unable to write file", "Error");
                        });

                        //delete message and confirm update
                        setTimeout(() => {
                            m.edit(`Done! Minion and Mount Data is now Up-to-Date!\n\n**Minions Before:** ${MinionFilter[0].MinionTotal}\n**Minions After:** ${MinTotal}\n\n**Mounts Before:** ${MountFilter[0].MountTotal}\n**Mounts After:** ${MouTotal}`)
                        }, 6000);
                    });
            });

        //return if no permission
    } else {
        return message.delete(), message.reply(`You dont have permission to use this command!`);
    };
};
