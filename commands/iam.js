const snekfetch = require("snekfetch");

module.exports = async (bot, message, args, Discord) => {
    let VisRole = message.member.guild.roles.find("name", "Visitor");
    let RecRole = message.member.guild.roles.find("name", "Recruit");

    if (!message.member.roles.has(VisRole.id)) {
        return message.reply(`You already have Recruit (or better) permissions!`);
    }

    if (!args[0]) {
        return message.reply("Missing argument! **[Character Name]**");
    }
    snekfetch.get("https://xivsync.com/character/search?name=" + args.join("%20") + "&server=Ragnarok").then(async res => {
        if (res.body.success === false || res.body.total === 0) {
            return message.reply(`Cannot find character "${args.join(" ")}" on Ragnarok!`);
        };

        var searchTerm = `${args.join(" ")}`;
        var results = res.body.data.results;
        var lodeID = results.filter(function (results) {
            return results.name.indexOf(searchTerm) > -1;
        });

        if (lodeID[0] === undefined) {
            return message.reply(`Cannot find character "${args.join(" ")}" on Ragnarok!`);
        };

        let embed = {
            "color": 65280,
            "thumbnail": {
                "url": `${lodeID[0].avatar}`
            },
            "author": {
                "name": `${lodeID[0].name} is now Verified✅`,
                "icon_url": `${lodeID[0].avatar}`,
                "url": `https://eu.finalfantasyxiv.com/lodestone/character/${lodeID[0].id}`,
            },
            "fields": [
                {
                    "name": "Ingame Name:",
                    "value": `${lodeID[0].name}`,
                    "inline": true
                },
                {
                    "name": "Discord Tag:",
                    "value": `${message.member.user.tag}`,
                    "inline": true
                },
                {
                    "name": "Lodestone ID:",
                    "value": `${lodeID[0].id}`,
                    "inline": true
                },
                {
                    "name": "Lodestone Link:",
                    "value": `[Click Me](https://eu.finalfantasyxiv.com/lodestone/character/${lodeID[0].id})`,
                    "inline": true
                },
            ]
        };
        await message.member.setNickname(`${lodeID[0].name}`);
        await message.member.removeRole(VisRole);
        await message.member.addRole(RecRole);
        await message.channel.send({ embed });
        //await message.delete();
    })
};