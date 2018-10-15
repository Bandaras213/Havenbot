module.exports = async (bot, member, moment) => {
    var VisRole = member.guild.roles.find(r => r.name === "Visitor");
    let embedicon

    if (!member.user.avatarURL) {
        embedicon = "https://puu.sh/AWOvv.png";
    } else {
        embedicon = member.user.avatarURL;
    };

    let embed = {
        "color": 65280,
        "timestamp": `${moment().format()}`,
        "thumbnail": {
            "url": "attachment://join.png",
        },
        "author": {
            "name": `${member.displayName} Joined the ${member.guild} Server`,
            "icon_url": `${embedicon}`,
        },
        "footer": {
            "text": `Discord account ${member.user.tag} was created on: ${moment(member.user.createdAt).format('DD/MM/YYYY')}`,
        },
        "fields": [
            {
                "name": "Discord User:",
                "value": `${member.user}`,
                "inline": true,
            },
            {
                "name": "Display Name:",
                "value": `${member.displayName}`,
                "inline": true,
            },
            {
                "name": "Discord Tag:",
                "value": `${member.user.tag}`,
                "inline": true,
            },
            {
                "name": "Discord ID:",
                "value": `${member.id}`,
                "inline": true,
            }
        ]
    };

    await member.addRole(VisRole);
    await member.guild.channels.find(c => c.name === "member-log").send({ embed, files: [{ attachment: './img/join.png', name: 'join.png' }] });
    bot.log(`${member.displayName} (${member.user.tag}) joined the ${member.guild} Server`, "Join");
};