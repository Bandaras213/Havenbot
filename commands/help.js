module.exports = (bot, message, args, Discord, moment) => {
    var embed = new Discord.RichEmbed()
        .setAuthor('Havenbot Commands')
        .setThumbnail(`${bot.user.avatarURL}`, false)
        .addField(".help", "Lists all available Commands", false)
        .addField(".fcinfo", "Shows Information about the FC", false)
        .addField(".checkrole [role]", "Checks and lists all members of a given role", false)
        .addField(".ping", "Calculates Bot and API Latency", false)
        .addField(".iam [Name]", "Changes your Nickname and adds you to the Recruit role", false)
        .addField(".8ball [Question]", "Answers a Yes or No Question randomly", false)
        .addField(".poll [Question]", "Lets you make a Poll using Reactions", false)
        .addField(".rate", "Rates You/Something out of 10", false)
        .addField(".d6 / .d20", "Rolls a D6 / D20 for You", false)
        .addField(".checkself", "Gets Discord Account Information about Yourself", false)
        .setFooter("If there are any issues with the bot please @xTobiShotz#0142 on Discord.")
        .setColor(message.guild.roles.find("name", "Commander").hexColor);
    message.channel.send(embed);
};