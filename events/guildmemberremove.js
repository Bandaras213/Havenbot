module.exports = (bot, member, moment) => {
    let embedicon
    if (!member.user.avatarURL) {
        embedicon = "https://puu.sh/AWOvD.png";
    } else {
        embedicon = member.user.avatarURL;
    };
    let footertext
    if (member.user.lastMessage == null) {
        footertext = `No message sent by ${member.displayName} since the last restart.`;
    } else {
        footertext = `Last message sent by ${member.displayName} was on ${moment(member.user.lastMessage.createdTimestamp).format('dddd, DD/MM/YYYY')} in #${member.user.lastMessage.channel.name}.`;
    };

    let embed = {
        "color": 16711680,
        "footer": {
            "text": `${footertext}`,
        },
        "thumbnail": {
            "url": `https://puu.sh/AWOvD.png`,
        },
        "author": {
            "name": `User ${member.displayName} left the ${member.guild} Server`,
            "icon_url": `${embedicon}`,
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
    member.guild.channels.find(c => c.name === "memberlog").send({ embed });

    bot.log(`${member.displayName} (${member.user.tag}) left the ${member.guild} Server`, "Leave");
};