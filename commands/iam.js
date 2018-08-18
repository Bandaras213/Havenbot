const snekfetch = require("snekfetch");

module.exports = async (bot, message, args, Discord) => {

    let VisRole = message.member.guild.roles.find(r => r.name === "Visitor");
    let RecRole = message.member.guild.roles.find(r => r.name === "Recruit");

    if (!message.member.roles.has(VisRole.id)) {
        return message.reply(`It looks like you already verified yourself! For a Namechange please ask an Sergeant (or higher)!`), message.react('❌');
    }

    if (!args[0]) {
        return message.reply("Missing argument! **[Character Name]**"), message.react('❌');
    }

    snekfetch.get("https://xivapi.com/character/search?name=" + args.join("%20") + "&server=Ragnarok" + `&key=${bot.config.xivapikey}`).then(async res => {
        if (res.body.Total === 0) {
            return message.reply(`Invalid argument! **[Cannot find character "${args.join(" ")}"!]**`), message.react('❌');
        };

        var searchTerm = `${args.join(" ")}`;
        var results = res.body.Characters;
        var lodeID = results.filter(function (results) {
            return results.Name.indexOf(searchTerm) > -1;
        });

        if (lodeID[0] === undefined) {
            return message.reply(`Invalid argument! **[Cannot find character "${args.join(" ")}"!]**`), message.react('❌');
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
        await message.member.removeRole(VisRole);
        await message.member.addRole(RecRole);
        await message.channel.send({ embed });
        await message.react('✅');
    })
};