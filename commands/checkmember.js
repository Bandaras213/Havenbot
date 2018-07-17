module.exports = (bot, message, args, Discord, moment) => {
    let ComRole = message.guild.roles.find("name", "Commander");
    let CapRole = message.guild.roles.find("name", "Captain");

    if (message.member.roles.has(ComRole.id) || message.member.roles.has(CapRole.id)) {
        if (args[0]) {
            let member = message.mentions.members.first();
            if (!member) return message.reply(`Unable to find argument! **[Mention]**`);

            let footertext
            if (member.user.lastMessage == null) {
                footertext = `No message sent by ${member.displayName} since the last restart.`;
            } else {
                footertext = `Last message sent by ${member.displayName} was on ${moment(member.user.lastMessage.createdTimestamp).format('dddd, DD/MM/YYYY')} in #${member.user.lastMessage.channel.name}.`;
            };

            let embed = {
                "color": `${member.highestRole.color}`,
                "footer": {
                    "text": `${footertext}`
                },
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

        } else return message.reply(`Missing argument! **[Mention]**`);
    } else {
        return message.delete(), message.reply(`You dont have permission to use this command!`);
    }
};