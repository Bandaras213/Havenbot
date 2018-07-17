module.exports = async (bot, member, moment) => {
    var VisRole = member.guild.roles.find("name", "Visitor");
    let embed = {
        "color": 65280,
        "thumbnail": {
            "url": `https://puu.sh/AWOvv.png`,
        },
        "author": {
            "name": `User ${member.displayName} Joined the ${member.guild} Server`,
            "icon_url": `${member.user.avatarURL}`,
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
    await member.guild.channels.find("name", "main").send(`Welcome ${member.user} to the ${member.guild} Discord! **Please make sure to read <#418201549597048844> to get access to all Channels!** <:Haven:430425064589230082>`);
    await member.guild.channels.find("name", "memberlog").send({ embed });

    bot.log(`${member.user.username} joined the ${member.guild} Server`);
};