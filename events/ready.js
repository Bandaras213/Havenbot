const ms = require("ms");
module.exports = bot => {
  bot.log(`${bot.user.tag} started with ${bot.users.size} Users, in ${bot.channels.size} Channels of ${bot.guilds.size} Servers.`, "Started");
  bot.user.setActivity("FINAL FANTASY XIV - A Realm Reborn");

  setInterval(function() {
    let games = ["Lord of the Verminion", "Triple Triad", "Jumbo Cactpot", "Chocobo Racing", "Crystal Tower Striker", "Cuff-A-Cur", "Monster Toss", "Moogle's Paw", "Out on a Limb", "The Finer Miner"];
    let randGame = Math.floor(Math.random() * games.length);
    bot.user.setActivity(`${games[randGame]}`);
  }, ms("5m"));
};
