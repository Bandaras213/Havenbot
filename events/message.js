module.exports = (bot, message, Discord, moment) => {
  if (message.author.equals(bot.user)) return;
  if (message.content.indexOf(bot.config.prefix) !== 0) return;
  const args = message.content
    .slice(bot.config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (bot.commands.has(command)) {
    bot.commands.get(command)(bot, message, args, Discord, moment);
    bot.log(`Executed: .${command}, User: ${message.member.displayName} (${message.member.user.tag}), Channel: #${message.channel.name}, Server: ${message.member.guild}`, "Command");
  }
};
