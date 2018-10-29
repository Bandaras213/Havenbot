module.exports = (bot, message, args, Discord, moment) => {

    //define rich embed
    var embed = new Discord.RichEmbed()
        .setAuthor('Havenbot Commands')
        .setThumbnail(`${bot.user.avatarURL}`, false)
        .addField(".help", "Lists all available commands", false)
        .addField(".iam [Character Name]", "Verifies you as your ingame character", false)
        .addField(".lookup [Character Name]", "Shows Lodestone Information about a Character (Ragnarok Only)", false)
        .addField(".fcinfo", "Shows Lodestone information about the FC", false)
        .addField(".checkself", "Gets Discord account information about yourself", false)
        .addField(".8ball [Question]", "Answers a Yes or No question randomly", false)
        .addField(".poll [Question]", "Lets you make a poll using reactions", false)
        .addField(".ship [@user @user]", "Ships two people. (0-100% compatibility)", false)
        .addField(".rate", "Rates You/Something out of 10", false)
        .addField(".d6 / .d20", "Rolls a D6 / D20 for you", false)
        .setFooter("If there are any issues with the bot please @xTobiShotz#0142 on Discord.")
        .setColor(message.guild.roles.find(r => r.name === "Commander").hexColor);

        //send embed
    message.channel.send(embed), message.react('✅');
};
