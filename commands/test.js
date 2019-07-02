module.exports = async (bot, message, args, Discord, moment) => {
  message.channel.send("OwnerID: " + process.env.OWNERID + " XIVAPIKEY: " + process.env.XIVAPIKEY);
};