const snekfetch = require("snekfetch")

module.exports = async (bot, message, args, Discord, moment) => {

    let user = message.member.user
    await message.channel.send(`${user}, REEEEEEEE`);
  

  try{
  snekfetch.get("https://mangarock.com/manga/mrs-serie-100190092").then(async res => {
    
    let title = res.header.title;
    
    console.log(title)
  })}