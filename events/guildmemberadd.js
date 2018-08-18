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
        "thumbnail": {
            "url": `https://puu.sh/AWOvv.png`,
        },
        "author": {
            "name": `User ${member.displayName} Joined the ${member.guild} Server`,
            "icon_url": `${embedicon}`,
        },
        "fields": [
            {
                "name": "User",
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
                "name": "Account Created on:",
                "value": `${moment(member.user.createdAt).format('dddd, DD/MM/YYYY')}`,
                "inline": true,
            },
        ]
    };
    await member.addRole(VisRole);
    await member.guild.channels.find(c => c.name === "main").send(`Welcome ${member.user} to the ${member.guild} Discord! **Please make sure to read <#418201549597048844> and verify yourself to get access to all channels!** <:Haven:430425064589230082>`);
    await member.guild.channels.find(c => c.name === "memberlog").send({ embed });

    bot.log(`${member.displayName} (${member.user.tag}) joined the ${member.guild} Server`, "Join");
};