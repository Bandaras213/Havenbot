module.exports = (bot, message, args, Discord, moment) => {
    let ComRole = message.guild.roles.find("name", "Commander");
    let CapRole = message.guild.roles.find("name", "Captain");

    if (message.member.roles.has(ComRole.id) || message.member.roles.has(CapRole.id)) {
        message.channel.send(args.join(" "));
        message.delete();
    } else {
        return message.delete(), message.reply(`You dont have permission to use this command!`);
    }
};