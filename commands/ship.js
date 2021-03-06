const fs = require("fs");
module.exports = async (bot, message, args, Discord, moment) => {
  let percent;
  let Datafilter = "data/data.json";
  let text;
  let emoji;
  let Textfilter = JSON.parse(fs.readFileSync(Datafilter, "utf8")).Shipping;

  if (args[0] && args[1]) {
    let person1 = getMemberFromMention(args[0]);
    let person2 = getMemberFromMention(args[1]);
    if (!person1 || !person2) {
      return message.reply(`Wrong arguments! **[Mentions]**`), message.react("❌");
    }

    if (person1 == person2) {
      return message.reply("Now that's just weird...");
    }

    let cheatIDS = [
      426806641216716800, //Havenbot
      98605179544285184,
      418409292048236554
    ];

    if (cheatIDS.indexOf(person1.id) > 0 && cheatIDS.indexOf(person2.id) > 0) {
      percent = 100;
    } else if (cheatIDS.indexOf(person2.id) > 0 && cheatIDS.indexOf(person1.id) > 0) {
      percent = 100;
    } else if (person1.id == cheatIDS[0] || person2.id == cheatIDS[0]) {
      percent = 100;
    } else {
      percent = Math.floor(Math.random() * 100 + 1);
    }

    if (percent <= 10) {
      text = Textfilter[0].Text[Math.floor(Math.random() * Textfilter[0].Text.length)].Text;
      emoji = Textfilter[0].Emoji;
    } else if (percent > 10 && percent <= 30) {
      text = Textfilter[1].Text[Math.floor(Math.random() * Textfilter[1].Text.length)].Text;
      emoji = Textfilter[1].Emoji;
    } else if (percent > 30 && percent <= 50) {
      text = Textfilter[2].Text[Math.floor(Math.random() * Textfilter[2].Text.length)].Text;
      emoji = Textfilter[2].Emoji;
    } else if (percent > 50 && percent <= 70) {
      text = Textfilter[3].Text[Math.floor(Math.random() * Textfilter[3].Text.length)].Text;
      emoji = Textfilter[3].Emoji;
    } else if (percent > 70 && percent < 100) {
      text = Textfilter[4].Text[Math.floor(Math.random() * Textfilter[4].Text.length)].Text;
      emoji = Textfilter[4].Emoji;
    } else if (percent == 100) {
      text = Textfilter[5].Text[Math.floor(Math.random() * Textfilter[5].Text.length)].Text;
      emoji = Textfilter[5].Emoji;
    }

    var embed = new Discord.RichEmbed()
      .setTitle(`${person1.displayName} & ${person2.displayName}`)
      .addField(`${emoji} **${percent}** ${emoji}`, text)
      .setColor("#ff0000");
    await message.channel.send({ embed });
    await message.react("✅");
  } else return message.reply(`Missing arguments! **[Mentions]**`), message.react("❌");

  function getMemberFromMention(mention) {
    const matches = mention.match(/^<@!?(\d+)>$/);
    if (!matches) {
      return false;
    }
    const id = matches[1];
    return message.guild.members.get(id);
  }
};
