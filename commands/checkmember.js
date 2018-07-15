module.exports = (bot, message, args, Discord, moment) => {
    let ComRole = message.guild.roles.find("name", "Commander");
    let CapRole = message.guild.roles.find("name", "Captain");

    if (message.member.roles.has(ComRole.id) || message.member.roles.has(CapRole.id)) {
        if (args[0]) {
            let member = message.mentions.members.first();
            if (!member) return message.reply(`Unable to find argument! **[Mention]**`);

            let guild = member.guild;
            let embed = {
                "color": `${message.guild.roles.find("name", "Commander").color}`,
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
                        "name": "User ID:",
                        "value": `${member.user.id}`,
                        "inline": true
                    },
                    {
                        "name": "Avatar URL:",
                        "value": `[Click Me](${member.user.displayAvatarURL})`,
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
                        "name": `Joined ${guild} on:`,
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