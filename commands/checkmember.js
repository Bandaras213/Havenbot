module.exports = (bot, message, args, Discord, moment) => {

    //check if the member has the permission to use the command
    if (message.member.roles.some(r => ["Captain", "Commander",].includes(r.name))) {


        //check if args exist
        if (args[0]) {

            //check if there is a mention in the message
            let member = message.mentions.members.first();
            if (!member) return message.reply(`Missing argument! **[Mention]**`), message.react('❌');

            let embedicon
            if (!member.user.avatarURL) {
                embedicon = "attachment://null.png";
            } else {
                embedicon = member.user.avatarURL;
            };

            //defining embed
            let embed = {
                "color": `${member.highestRole.color}`,
                "thumbnail": {
                    "url": `${embedicon}`
                },
                "author": {
                    "name": `Overview of User ${member.displayName}:`,
                    "icon_url": `${embedicon}`,
                },
                "fields": [
                    {
                        "name": "User Tag:",
                        "value": `${member.user.tag}`, //example: User#1234
                        "inline": true
                    },
                    {
                        "name": "Avatar URL:",
                        "value": `[Click Me](${embedicon})`,
                        "inline": true
                    },
                    {
                        "name": "User ID:",
                        "value": `${member.user.id}`, //example: 123456789012345678
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

            //delete original message and send embed
            message.delete();
            message.channel.send({ embed, files: [{ attachment: './img/null.png', name: 'null.png' }] });

            //return if no mention
        } else return message.reply(`Missing argument! **[Mention]**`), message.react('❌');
    } else {
        //return if no permission
        return message.delete(), message.reply(`You dont have permission to use that command!`);
    };
};
