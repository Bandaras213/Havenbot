module.exports = (bot, message, args, Discord, moment) => {

    //define rich embed
    var embed = new Discord.RichEmbed()
        .addField(`🎲${message.member.displayName} rolls a D6🎲`, `It landed on **${Math.floor(Math.random() * 6 + 1)}!**`, false) //math for a random number from 1-6
        .setColor(message.guild.roles.find(r => r.name === "Commander").hexColor);

    //delete original message and send embed
    message.delete();
    message.channel.send(embed);
};
