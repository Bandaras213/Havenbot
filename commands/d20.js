module.exports = (bot, message, args, Discord, moment) => {
    var embed = new Discord.RichEmbed()
        .addField(`🎲${message.member.displayName} rolls a D20🎲`, `It landed on **${Math.floor(Math.random() * 20 + 1)}!**`, false)
        .setColor(message.guild.roles.find(r => r.name === "Commander").hexColor);
    message.delete();
    message.channel.send(embed);
};
