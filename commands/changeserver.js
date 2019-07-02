const config = "data/botsettings.json";
const fs = require("fs");

module.exports = async (bot, message, args, Discord, moment) => {
  let user = message.author;
  if (args[0] == "show") {
    showserver();
    return;
  } else if (args[0] == "change") {
    changeserver();
    return;
  } else {
    message.channel.send("You need to enter a valid command!");
  }

  function showserver() {
    message.delete();
    fs.readFile(config, "utf8", (err, jsonString) => {
      if (err) {
        console.log("Error reading file from disk:", err);
        message.channel.send("Error reading file from disk:", err);
        return;
      }
      try {
        const lodestone = JSON.parse(jsonString);
        console.log("The Current Server is:", lodestone.lodestone_server);
        message.channel.send(user + " The Server at the moment is: " + lodestone.lodestone_server);
      } catch (err) {
        console.log("Error parsing JSON string:", err);
      }
    });
  }

  function changeserver() {
    message.delete();
    const server = {
      lodestone_server: args[1]
    };
    const jsonString = JSON.stringify(server);
    fs.writeFile(config, jsonString, err => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log(user + " Successfully wrote file");
        message.channel.send(user + " The Server is now: " + args[1]);
      }
    });
  }
};
