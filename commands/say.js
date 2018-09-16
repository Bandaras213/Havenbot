module.exports = (bot, message, args, Discord, moment) => {

    if (message.member.roles.some(r => ["Captain", "Commander",].includes(r.name))) {
        message.channel.send(args.join(" "));
        message.delete();
    } else {
        return message.delete(), message.reply(`You dont have permission to use that command!`);
    };
};
