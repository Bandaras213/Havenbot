module.exports = (bot, message, args, Discord, moment) => {

    if (message.member.roles.some(r => ["Captain", "Commander",].includes(r.name))) {
        if (args[0]) {
            let member = message.mentions.members.first();
            if (!member) return message.reply(`Missing argument! **[Mention]**`), message.react('❌');

            let embed = {
                "color": `${member.highestRole.color}`,
                "thumbnail": {
                    "url": `${member.user.avatarURL}`
                },
                "author": {
                    "name": `Overview of User ${member.displayName}:`,
                    "icon_url": `${member.user.avatarURL}`,
                },
                "fields": [
                    {
                        "name": "User Tag:",
                        "value": `${member.user.tag}`,
                        "inline": true
                    },
                    {
                        "name": "Avatar URL:",
                        "value": `[Click Me](${member.user.displayAvatarURL})`,
                        "inline": true
                    },
                    {
                        "name": "User ID:",
                        "value": `${member.user.id}`,
                        "inline": true
                    },
                    {
                        "name": "Highest Role:",
                        "value": `${member.highestRole.name}`,
                        "inline": true
                    },
                    {
                        "name": "Account Created on:",
                        "value": `${moment(member.user.createdAt).format('dddd, DD/MM/YYYY')}`,
                        "inline": true
                    },
                    {
                        "name": `Joined ${member.guild} on:`,
                        "value": `${moment(member.joinedAt).format('dddd, DD/MM/YYYY')}`,
                        "inline": true
                    }
                ]
            };
            message.delete();
            message.channel.send({ embed });

        } else return message.reply(`Missing argument! **[Mention]**`), message.react('❌');
    } else {
        return message.delete(), message.reply(`You dont have permission to use that command!`);
    }
};
