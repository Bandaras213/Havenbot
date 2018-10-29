module.exports = (bot, message, args, Discord, moment) => {

    //if there are arguments use those as the thing to be rated, else rate the member
    if (args[0]) {
        message.channel.send(`I'd rate **${(args.join(" "))}** a ✨**${Math.floor(Math.random() * 10 + 1)}/10!**✨`);
    }
    else {
        (message.channel.send(`I'd rate **${message.member.user}** a ✨**${Math.floor(Math.random() * 10 + 1)}/10!**✨`));
    };

    message.react('✅');
};
