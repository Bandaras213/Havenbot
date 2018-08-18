module.exports = async (bot, message, args, Discord, moment) => {
    let ComRole = message.guild.roles.find(r => r.name === "Commander");
    let CapRole = message.guild.roles.find(r => r.name === "Captain");

    const deleteCount = parseInt(args[0], 10);

    if (message.member.roles.has(ComRole.id) || message.member.roles.has(CapRole.id)) {

        if (!deleteCount || deleteCount < 1 || deleteCount > 100)
            return message.reply("Invalid argument! **[Number has to be between 1 and 100]**"), message.react('❌');

        const fetched = await message.channel.fetchMessages({ limit: deleteCount + 1 });
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`**ERROR Couldn't delete messages because of:** ${error}`));
        return bot.log(`${message.member.displayName} (${message.member.user.tag}) deleted ${deleteCount} messages in #${message.channel.name} on the ${message.member.guild} Server`, "Command");
    }
    else {
        return message.delete(), message.reply(`You dont have permission to use this command!`);
    }
};