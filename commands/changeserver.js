const config = require("data/botsettings.json");
const fs = require("fs");

let user = message.author;

fs.readFile(config, "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    const lodestone = JSON.parse(jsonString);
    console.log("The Current Server is:", lodestone.lodestone_server);
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});

module.exports = async (bot, message, args, Discord, moment) => {
  if (args[0] == "show") {
    showserver(message, serverQueue);
    return;
  } else if (args[0] == "skip") {
    skip(message, serverQueue);
    return;
  } else if (args[0] == "stop") {
    stop(message, serverQueue);
    return;
  } else if (args[0] == "list") {
    list(message, serverQueue);
    return;
  } else {
    message.channel.send("You need to enter a valid command!");
  }

  function showserver() {
    message.channel.send(user, "The Server at the moment is:", lodestone.lodestone_server)
  }
};
