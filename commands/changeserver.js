const fetch = require("node-fetch");
const config = "data/botsettings.json";
const fs = require("fs");
const ms = require("ms");

module.exports = async (bot, message, args, Discord) => {
  let user = message.member.user;
  let server = "";
  const m = await message.channel.send(`${user}, Looking for Character **"${args.join(" ")}"** on the Server... Give me a sec...`);
  if (!message.member.roles.some(r => ["Visitor"].includes(r.name))) {
    return m.edit(`${user}, You already verified yourself! For a Namechange please ask an Sergeant (or higher)!`), message.react("❌");
  }

  if (args.length != 2) {
    return (
      m.edit(`${user}, Invalid or Missing argument! **[Character Name Format: Firstname Lastname]**`),
      message.react("❌"),
      setTimeout(() => {
        message.delete();
        m.delete();
      }, ms("30s"))
    );
  }

  let firstname = args[0].charAt(0).toUpperCase() + args[0].substring(1);
  let lastname = args[1].charAt(0).toUpperCase() + args[1].substring(1);

  fs.readFile(config, "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      message.channel.send("Error reading file from disk:", err);
      return;
    }
    try {
      const lodestone = JSON.parse(jsonString);
      server = lodestone.lodestone_server;
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });

  try {
    await fetch("https://xivapi.com/character/search?name=" + args.join("%20") + "&server=" + server + `&key=${process.env.XIVAPIKEY}`, {
      method: "post"
    })
      .then(res => res.json())
      .then(async res => {
        if (res.body.Pagination.ResultsTotal === 0) {
          return (
            m.edit(`${user}, Invalid argument! **[Cannot find character "${args.join(" ")}"!]**`),
            message.react("❌"),
            setTimeout(() => {
              message.delete();
              m.delete();
            }, ms("30s"))
          );
        }

        var searchTerm = `${firstname} ${lastname}`;
        var results = res.body.Results;
        var lodeID = results.filter(function(results) {
          return results.Name.indexOf(searchTerm) > -1;
        });

        let characterid = res.body.Results.ID;

        if (lodeID[0] === undefined) {
          return (
            m.edit(`${user}, Invalid argument! **[Cannot find character "${args.join(" ")}"!]**`),
            message.react("❌"),
            setTimeout(() => {
              message.delete();
              m.delete();
            }, ms("30s"))
          );
        }

        await fetch("https://xivapi.com/character/" + characterid + "?data=FC" + `&key=${process.env.XIVAPIKEY}`, {
          method: "post"
        })
          .then(res1 => res1.json())
          .then(async res1 => {
            let freecompanyid = res1.FreeCompanyId;

            await fetch("https://xivapi.com/freecompany/" + freecompanyid + "?data=FCM" + `&key=${bot.config.xivapikey}`, {
              method: "post"
            })
              .then(sear => sear.json())
              .then(async sear => {
                var RecRole = message.member.guild.roles.find(r => r.name === "Recruit");
                var FetRole;

                if (!sear.body.Info.FreeCompany.State === 2) {
                  FetRole = RecRole;
                }
                if (!sear.body.Info.FreeCompanyMembers.State === 2) {
                  FetRole = RecRole;
                }

                let searPayload = sear.body.FreeCompanyMembers;
                let searPayloadFilter = searPayload.filter(ID => ID.ID == lodeID[0].ID);
                if (searPayloadFilter[0]) {
                  FetRole = message.member.guild.roles.find(r => r.name === `${searPayloadFilter[0].Rank}`);
                } else {
                  FetRole = RecRole;
                }

                let embed = {
                  color: 65280,
                  thumbnail: {
                    url: `${lodeID[0].Avatar}`
                  },
                  author: {
                    name: `${lodeID[0].Name} is now verified as a ${FetRole.name}!`
                  },
                  fields: [
                    {
                      name: "Ingame Name:",
                      value: `${lodeID[0].Name}`,
                      inline: true
                    },
                    {
                      name: "Discord Tag:",
                      value: `${message.member.user.tag}`,
                      inline: true
                    },
                    {
                      name: "FC Rank:",
                      value: `${FetRole.name}`,
                      inline: true
                    },
                    {
                      name: "Lodestone Link:",
                      value: `[Click Me](https://eu.finalfantasyxiv.com/lodestone/character/${lodeID[0].ID})`,
                      inline: true
                    }
                  ]
                };

                await message.member.setNickname(`${lodeID[0].Name}`);
                await message.member.removeRole(message.member.guild.roles.find(r => r.name === "Visitor"));
                await message.member.addRole(FetRole);
                await message.member.guild.channels.find(c => c.name === "main").send(`Please Welcome ${message.member.user} to the ${message.member.guild} Discord! <:Haven:430425064589230082>`, { embed });
                await message.delete();
                await m.delete();
              });
          });
      });
  } catch (error) {
    bot.log(error, "Error");
    m.edit(`${user}, Something went wrong while requesting API data, Try again in a few minutes!`),
      message.react("❌"),
      setTimeout(() => {
        message.delete();
        m.delete();
      }, ms("30s"));
  }
};
