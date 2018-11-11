module.exports = async (bot, message, args, Discord, moment) => {

    //check if the member has the permission to use the command
    if (message.member.roles.some(r => ["Captain", "Commander",].includes(r.name))) {

        //parse how many should be deleted as an integer in base 10
        const deleteCount = parseInt(args[0], 10);

        //check if the int is in the min/max fetch range (1-100)
        if (!deleteCount || deleteCount < 1 || deleteCount > 99)

            //return if not
            return message.reply("Invalid argument! **[Number has to be between 1 and 99]**"), message.react('❌');

        //fetch messages
        const fetched = await message.channel.fetchMessages({ limit: deleteCount + 1 }); //+1 to delete the original message too

        //bulk delete fetched messages
        message.channel.bulkDelete(fetched)
            .catch(error => { bot.log(error, "Error"), message.reply(`**ERROR Couldn't delete messages because of:** ${error}`) }); //log and reply if there is a error

        //extra log with who and how many messages got deleted in what channel
        bot.log(`${message.member.displayName} (${message.member.user.tag}) deleted ${deleteCount} messages in #${message.channel.name} on the ${message.member.guild} Server`, "Command");
    }
    else {

        //return if no permission
        return message.delete(), message.reply(`You dont have permission to use this command!`);
    };
};
