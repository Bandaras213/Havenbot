module.exports = (bot, message, args, Discord, moment) => {
    if (message.member.roles.some(r => ["Captain", "Commander",].includes(r.name))) {
        if (args[0]) {
            let roleName = args.slice(0).join(" ")
            let membersWithRole = message.guild.members.filter(member => {
                return member.roles.find(r => r.name === roleName);
            }).map(member => {
                return member.displayName;
            });

            if (membersWithRole === undefined || membersWithRole.length == 0) {
                return message.reply(`Invalid argument! **[Role "${roleName}" does not exist]**`), message.react('❌');
            };

            let embed = new Discord.RichEmbed({
                "title": `${membersWithRole.length} Users with the ${roleName} role:`,
                "description": membersWithRole.join("\n"),
                "color": `${message.guild.roles.find(r => r.name === roleName).color}`,
            });

            message.delete();
            message.channel.send({ embed });
        } else return message.reply(`Missing argument! **[Role Name]**`), message.react('❌');
    } else {
        return message.delete(), message.reply(`You dont have permission to use that command!`);
    };
};
