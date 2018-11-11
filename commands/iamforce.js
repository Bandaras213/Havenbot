const snekfetch = require("snekfetch");
const ms = require("ms");

module.exports = async (bot, message, args, Discord) => {

    //check if the member has the permission to use the command
    if (message.member.roles.some(r => ["Captain", "Commander", "Lieutenant"].includes(r.name))) {

        //check if there is a mention in the message
        let user = message.mentions.users.first();
        if (!user) {
            return m.edit(`${user}, Missing argument! **[Mention]**`), message.react('❌'),
                setTimeout(() => {
                    message.delete();
                    m.delete()
                }, ms("30s"));
        };

        //capitalize the fist letter of first and last name
        let firstname = bot.caps(args[1]);
        let lastname = bot.caps(args[2]);

        let role

        //if there is a thrid argument use it as the role name
        if (args[3]) {

            //capitalize the fist letter of role name
            role = bot.caps(args[3]);

            //if the role cannot be found return
            if (!message.guild.roles.find(r => r.name === `${role}`)) {
                return m.edit(`Cannot find Role **"${role}"!**`), message.react('❌'),
                    setTimeout(() => {
                        message.delete();
                        m.delete()
                    }, ms("30s"));
            };

            //if not use the Recruit role
        } else {
            role = "Recruit"
        };

        //send message to confirm input
        const m = await message.channel.send(`Force Adding **"${firstname} ${lastname}"** as a ${role}, Give me a sec...`);

        //check if the mentioned member
        if (!message.mentions.members.first().roles.some(r => ["Visitor",].includes(r.name))) {
            return m.edit(`This command can only be used on Visitors.`), message.react('❌'),
                setTimeout(() => {
                    message.delete();
                    m.delete()
                }, ms("30s"));
        };

        //define embed
        let embed = {
            "color": 65280,
            "thumbnail": {
                "url": `${user.displayAvatarURL}`
            },
            "author": {
                "name": `${firstname} ${lastname} is now verified as a ${role}`,
            },
            "fields": [
                {
                    "name": "Ingame Name:",
                    "value": `${firstname} ${lastname}`,
                    "inline": true
                },
                {
                    "name": "Discord Tag:",
                    "value": `${user.tag}`,
                    "inline": true
                },
                {
                    "name": "FC Rank:",
                    "value": `${role}`,
                    "inline": true
                },
            ]
        };

        //change the nickname of the mentioned user, remove the visitor role, give them the correct role, send the welcome embed to #main and delete the original messages
        await message.mentions.members.first().setNickname(`${firstname} ${lastname}`);
        await message.mentions.members.first().removeRole(message.member.guild.roles.find(r => r.name === "Visitor"));
        await message.mentions.members.first().addRole(message.member.guild.roles.find(r => r.name === `${role}`));
        await message.member.guild.channels.find(c => c.name === "main").send(`Please Welcome ${user} to the ${message.member.guild} Discord! <:Haven:430425064589230082>`, { embed });
        await message.delete();
        await m.delete();

        //return if no permission
    } else {
        return message.delete(), message.reply(`You dont have permission to use that command!`);
    };
};
