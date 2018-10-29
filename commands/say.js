module.exports = (bot, message, args, Discord, moment) => {

    //check if the member has the permission to use the command
    if (message.member.roles.some(r => ["Captain", "Commander",].includes(r.name))) {

        //replace the orignal message with one sent by the bot
        message.channel.send(args.join(" "));
        message.delete();

        //return if no permission
    } else {
        return message.delete(), message.reply(`You dont have permission to use that command!`);
    };
};
