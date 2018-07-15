module.exports = (bot, message, args, Discord, moment) => {
    if (!args[1]) return message.reply(`Missing argument! **[Question]**`);

    var embed = new Discord.RichEmbed()
        .addField(`❗A Poll Has Been Started By ${message.member.displayName}`, `❓${args.slice(0).join(" ")}`)
        .setColor(message.guild.roles.find("name", "Commander").hexColor)
        .setFooter(`You Can Now Vote Using The Reactions Below!`);
    message.delete();
    message.channel.send({ embed })
        .then(function (message) {
            message.react('👍')
                .then(() => message.react('🤷'))
                .then(() => message.react('👎'))
        }).catch(() => bot.log(`Emoji failed to react because of ${error}`, 'Error'));
};