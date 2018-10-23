const snekfetch = require("snekfetch");

module.exports = async (bot, message, args, Discord, moment) => {

    let user = message.member.user
    const m = await message.channel.send(`${user}, DAB`);

  await snekfetch.get("https://mangarock.com/manga/mrs-serie-100190092")
  .then(r => r.body)
  .then(x => console.log("snekfetch"));
}