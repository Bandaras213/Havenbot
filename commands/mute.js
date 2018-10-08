const ms = require("ms");
module.exports = (bot, message, args, Discord, moment) => {
    let MuteRole = message.guild.roles.find(r => r.name === "Mute");

    if (message.member.roles.some(r => ["Captain", "Commander",].includes(r.name))) {
        let member = message.mentions.members.first();
        if (!member) return message.reply(`Missing argument! **[Mention]**`), message.react('❌');
        let time = args[1];
        if (!time) return message.reply(`Missing argument! **[Mute Duration]**`), message.react('❌');

        member.addRole(MuteRole);
        if (member.voiceChannel) { member.setMute(true) };
        message.channel.send(`${member} has been muted for ${ms(ms(time), { long: true })}!`);
        message.react('✅');

        setTimeout(function () {
            member.removeRole(MuteRole);
            if (member.voiceChannel) { member.setMute(false) };
            message.channel.send(`${member} has been unmuted!`);
        }, ms(time));
    } else {
        return message.delete(), message.reply(`You dont have permission to use that command!`);
    };
};
