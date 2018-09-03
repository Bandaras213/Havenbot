module.exports = (bot, message, args, Discord, moment) => {
    let embed = {
        "color": `${message.member.highestRole.color}`,
        "thumbnail": {
            "url": `${message.member.user.avatarURL}`
        },
        "author": {
            "name": `Overview of User ${message.member.displayName}:`,
            "icon_url": `${message.member.user.avatarURL}`,
        },
        "fields": [
            {
                "name": "User Tag:",
                "value": `${message.member.user.tag}`,
                "inline": true
            },
            {
                "name": "Avatar URL:",
                "value": `[Click Me](${message.member.user.displayAvatarURL})`,
                "inline": true
            },
            {
                "name": "User ID:",
                "value": `${message.member.user.id}`,
                "inline": true
            },
            {
                "name": "Highest Role:",
                "value": `${message.member.highestRole.name}`,
                "inline": true
            },
            {
                "name": "Account Created on:",
                "value": `${moment(message.member.user.createdAt).format('dddd, DD/MM/YYYY')}`,
                "inline": true
            },
            {
                "name": `Joined ${message.member.guild} on:`,
                "value": `${moment(message.member.joinedAt).format('dddd, DD/MM/YYYY')}`,
                "inline": true
            }
        ]
    };

    message.delete();
    message.channel.send({ embed });
};
