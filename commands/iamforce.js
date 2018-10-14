const snekfetch = require("snekfetch");
const ms = require("ms");

module.exports = async (bot, message, args, Discord) => {
    if (message.member.roles.some(r => ["Captain", "Commander", "Lieutenant"].includes(r.name))) {
        let user = message.mentions.users.first();
        let firstname = args[1].charAt(0).toUpperCase() + args[1].substring(1);
        let lastname = args[2].charAt(0).toUpperCase() + args[2].substring(1);
        let role

        const m = await message.channel.send(`Force Adding **"${firstname} ${lastname}"** as a ${role}, Give me a sec...`);

        if (args[3]) {
            role = args[3]
            if (!message.member.roles.find(r => r.name === role)) {
                return m.edit(`Cannot find Role "${role}"`), message.react('❌'),
                    setTimeout(() => {
                        message.delete();
                        m.delete()
                    }, ms("30s"));
            };

        } else {
            role = "Recruit"
        };

        if (!message.mentions.members.first().roles.some(r => ["Visitor",].includes(r.name))) {
            return m.edit(`This command can only be used on Visitors.`), message.react('❌'),
                setTimeout(() => {
                    message.delete();
                    m.delete()
                }, ms("30s"));
        };

        let embed = {
            "color": 65280,
            "thumbnail": {
                "url": `${user.displayAvatarURL}`
            },
            "author": {
                "name": `${firstname} ${lastname} is now verified as a ${role}`,
            },
            "fields": [
                {
                    "name": "Ingame Name:",
                    "value": `${firstname} ${lastname}`,
                    "inline": true
                },
                {
                    "name": "Discord Tag:",
                    "value": `${user.tag}`,
                    "inline": true
                },
                {
                    "name": "FC Rank:",
                    "value": `${role}`,
                    "inline": true
                },
            ]
        };

        await message.mentions.members.first().setNickname(`${firstname} ${lastname}`);
        await message.mentions.members.first().removeRole(message.member.guild.roles.find(r => r.name === "Visitor"));
        await message.mentions.members.first().addRole(message.member.guild.roles.find(r => r.name === `${role}`));
        await message.member.guild.channels.find(c => c.name === "main").send(`Please Welcome ${user} to the ${message.member.guild} Discord! <:Haven:430425064589230082>`, { embed });
        await message.delete();
        await m.delete();
    } else {
        return message.delete(), message.reply(`You dont have permission to use that command!`);
    };
};
