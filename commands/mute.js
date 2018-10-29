const ms = require("ms");
module.exports = (bot, message, args, Discord, moment) => {
    let MuteRole = message.guild.roles.find(r => r.name === "Mute");

    //check if the member has the permission to use the command
    if (message.member.roles.some(r => ["Captain", "Commander",].includes(r.name))) {

        //check if a member has been mentioned and a duration has been defined, return if not
        let member = message.mentions.members.first();
        let time = args[1];
        if (!member) return message.reply(`Missing argument! **[Mention]**`), message.react('❌');
        if (!time) return message.reply(`Missing argument! **[Mute Duration]**`), message.react('❌');

        //give the member the muted role making them unable to type and talk
        member.addRole(MuteRole);

        //if the member is in a voicechannel already, mute them
        if (member.voiceChannel) { member.setMute(true) };

        //reply as confirmation of muting the member for duration
        message.channel.send(`${member} has been muted for ${ms(ms(time), { long: true })}!`), message.react('✅');

        //remove the mute role, if the member is in a voicechannel unmute them and send a message to confirm
        setTimeout(() => {
            member.removeRole(MuteRole);
            if (member.voiceChannel) { member.setMute(false) };
            message.channel.send(`${member} has been unmuted!`);
        }, ms(time));

        //return if no permission
    } else {
        return message.delete(), message.reply(`You dont have permission to use that command!`);
    };
};
