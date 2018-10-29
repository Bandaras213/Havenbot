module.exports = (bot, message, args, Discord, moment) => {

    //define rich embed
    var embed = new Discord.RichEmbed()
        .addField(`🎲${message.member.displayName} rolls a D20🎲`, `It landed on **${Math.floor(Math.random() * 20 + 1)}!**`, false) //math for a random number from 1-20
        .setColor(message.guild.roles.find(r => r.name === "Commander").hexColor);

    //delete original message and send embed
    message.delete();
    message.channel.send(embed);
};
