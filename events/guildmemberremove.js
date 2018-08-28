module.exports = (bot, member, moment) => {
    let embedicon
    if (!member.user.avatarURL) {
        embedicon = "https://puu.sh/AWOvD.png";
    } else {
        embedicon = member.user.avatarURL;
    };

    let embed = {
        "color": 16711680,
        "thumbnail": {
            "url": `https://puu.sh/AWOvD.png`,
        },
        "author": {
            "name": `${member.displayName} left the ${member.guild} Server`,
            "icon_url": `${embedicon}`,
        },
        "footer": {
            "text": `${member.displayName} had been on ${member.guild} since: ${moment(member.joinedAt).format('DD/MM/YYYY')}`,
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
        ]
    };
    member.guild.channels.find(c => c.name === "memberlog").send({ embed });

    bot.log(`${member.displayName} (${member.user.tag}) left the ${member.guild} Server`, "Leave");
};