module.exports = (bot, message, args, Discord, moment) => {
    var embed = new Discord.RichEmbed()
        .setAuthor('About the Free Company "Haven"')
        .setTitle('Haven on the Lodestone', true)
        .setThumbnail("https://puu.sh/zQaB3.png", true)
        .addField("Free Company Name", "Haven", true)
        .addField("Free Company Tag", "«Haven»", true)
        .addField("Formed on", "18/07/2017", true)
        .addField("Free Company Estate", "Plot 16, 13 Ward, Shirogane", true)
        .setColor(message.guild.roles.find("name", "Commander").hexColor)
        .setURL("https://eu.finalfantasyxiv.com/lodestone/freecompany/9237023573225331624/")
    message.channel.send(embed);
};