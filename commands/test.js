const fs = require("fs");
let Datafilter = "data/data.json";
module.exports = async (bot, message, args, Discord, moment) => {
  fs.readFile(Datafilter, "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      const lodestone = JSON.parse(jsonString);
      var MinionFilter = lodestone.Minions[0].MinionTotal;
      var MountFilter = lodestone.Mounts[0].MountTotal;
      message.channel.send("Miniontotal: " + MinionFilter + " Mounttotal: " + MountFilter)
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
};