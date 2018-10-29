module.exports = async (bot, message, args, Discord, moment) => {

    //send message
    const m = await message.channel.send("Ping?");

    //calculate ping based on how long it took to send the message after the command was executed and show API ping
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
    message.delete();
};
