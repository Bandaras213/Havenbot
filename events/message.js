module.exports = (bot, message, Discord, moment) => {

    //return if the message author is a bot or the content of the message doesn't start with the prefix
    if (message.author.equals(bot.user)) return;
    if (message.content.indexOf(bot.config.prefix) !== 0) return;

    //define args and remove the prefix
    const args = message.content.slice(bot.config.prefix.length).trim().split(/ +/g);

    //if the commands collection has the command in it, get that command
    const command = args.shift().toLowerCase();

    if (bot.commands.has(command)) {
        bot.commands.get(command)(bot, message, args, Discord, moment);

        bot.log(`Executed: .${command}, User: ${message.member.displayName} (${message.member.user.tag}), Channel: #${message.channel.name}, Server: ${message.member.guild}`, "Command");
    };
};