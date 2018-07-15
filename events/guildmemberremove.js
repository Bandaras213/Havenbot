module.exports = (bot, member, moment) => {
    let embed = {
        "color": 16711680,
        "footer": {
            "text": `Last message sent by ${member.displayName} was on ${moment(member.lastMessage.createdAt).format('dddd, DD/MM/YYYY')} in #${member.user.lastMessage.channel.name}`,
        },
        "thumbnail": {
            "url": `https://puu.sh/AWOvD.png`,
        },
        "author": {
            "name": `User ${member.displayName} left the ${member.guild} Server`,
            "icon_url": `${member.user.avatarURL}`,
        },
        "fields": [
            {
                "name": "User:",
                "value": `${member.user}`,
                "inline": true,
            },
            {
                "name": "Displayname:",
                "value": `${member.displayName}`,
                "inline": true,
            },
            {
                "name": "Tag:",
                "value": `${member.user.tag}`,
                "inline": true,
            },
            {
                "name": "Discord ID:",
                "value": `${member.id}`,
                "inline": true,
            },
            {
                "name": `Joined ${member.guild} on:`,
                "value": `${moment(member.joinedAt).format('dddd, DD/MM/YYYY')}`,
                "inline": true,
            },
        ]
    };
    member.guild.channels.find("name", "memberlog").send({ embed });

    bot.log(`${member.user.username} left the ${member.guild} Server`);
};