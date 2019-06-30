module.exports = async (bot, message, args, Discord, moment) => {
  if (!args[0]) return message.reply(`Missing argument! **[Question]**`), message.react("❌");
  var embed = new Discord.RichEmbed()
    .addField(`❗A Poll Has Been Started By ${message.member.displayName}`, `❓${args.slice(0).join(" ")}`)
    .setColor(message.guild.roles.find(r => r.name === "Commander").hexColor)
    .setFooter(`You Can Now Vote Using The Reactions Below!`);
  await message.delete();
  let msg = await message.channel.send({ embed });
  await msg.react("👍");
  await msg.react("👎");
};
