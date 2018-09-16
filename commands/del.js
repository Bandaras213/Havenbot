module.exports = async (bot, message, args, Discord, moment) => {

    const deleteCount = parseInt(args[0], 10);

    if (message.member.roles.some(r => ["Captain", "Commander",].includes(r.name))) {

        if (!deleteCount || deleteCount < 1 || deleteCount > 99)
            return message.reply("Invalid argument! **[Number has to be between 1 and 99]**"), message.react('❌');

        const fetched = await message.channel.fetchMessages({ limit: deleteCount + 1 });
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`**ERROR Couldn't delete messages because of:** ${error}`));
        return bot.log(`${message.member.displayName} (${message.member.user.tag}) deleted ${deleteCount} messages in #${message.channel.name} on the ${message.member.guild} Server`, "Command");
    }
    else {
        return message.delete(), message.reply(`You dont have permission to use this command!`);
    };
};
