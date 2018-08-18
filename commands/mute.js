const ms = require("ms");
module.exports = (bot, message, args, Discord, moment) => {
    let ComRole = message.guild.roles.find(r => r.name === "Commander");
    let CapRole = message.guild.roles.find(r => r.name === "Captain");
    let MteRole = message.guild.roles.find(r => r.name === "Mute");

    if (message.member.roles.has(ComRole.id) || message.member.roles.has(CapRole.id)) {
        let member = message.mentions.members.first();
        if (!member) return message.reply(`Missing argument! **[Mention]**`), message.react('❌');
        let time = args[1];
        if (!time) return message.reply(`Missing argument! **[Mute Duration]**`), message.react('❌');

        member.addRole(MteRole);
        if (member.voiceChannel) { member.setMute(true) };
        message.channel.send(`${member} has been muted for ${ms(ms(time), { long: true })}!`);

        setTimeout(function () {
            member.removeRole(MteRole);
            if (member.voiceChannel) { member.setMute(false) };
            message.channel.send(`${member} has been unmuted!`);
        }, ms(time));
    } else {
        return message.delete(), message.reply(`You dont have permission to use that command!`);
    }
};