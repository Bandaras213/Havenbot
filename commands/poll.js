module.exports = async (bot, message, args, Discord, moment) => {

    //check if there are no arguments
    if (!args[0]) return message.reply(`Missing argument! **[Question]**`), message.react('❌');

    //define embed
    var embed = new Discord.RichEmbed()
        .addField(`❗A Poll Has Been Started By ${message.member.displayName}`, `❓${args.slice(0).join(" ")}`)
        .setColor(message.guild.roles.find(r => r.name === "Commander").hexColor)
        .setFooter(`You Can Now Vote Using The Reactions Below!`);

    //delete the original message, send the embed and react to it
    await message.delete();
    let msg = await message.channel.send({ embed });
    await msg.react('👍');
    await msg.react('👎');
};
