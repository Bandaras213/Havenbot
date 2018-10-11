const fs = require("fs");
module.exports = async (bot, message, args, Discord, moment) => {
    let percent = Math.floor(Math.random() * 100)+1;
    let TextMath = Math.floor(Math.random() * 3);
    let Datafilter = "data/data.json"
    let text
    let emoji
    let Textfilter = JSON.parse(fs.readFileSync(Datafilter, 'utf8')).Shipping
    if (args[0] && args[1]) {
        let person1 = getMemberFromMention(args[0]);
        let person2 = getMemberFromMention(args[1]);
        if (!person1 || !person2) {
            return message.reply(`Wrong arguments! **[Mentions]**`), message.react('❌');
        };

        if (person1 == person2) {
            return message.reply("Now that's just weird...")
        };

        if (percent < 11) {
            text = Textfilter[0].Text[TextMath].Text
            emoji = "🚫";
        } else if (percent > 10 && percent < 31) {
            text = Textfilter[1].Text[TextMath].Text
            emoji = "💢";
        } else if (percent > 30 && percent < 51) {
            text = Textfilter[2].Text[TextMath].Text
            emoji = "💔";
        } else if (percent > 50 && percent < 71) {
            text = Textfilter[3].Text[TextMath].Text
            emoji = "💘";
        } else if (percent > 70 && percent < 100) {
            text = Textfilter[4].Text[TextMath].Text
            emoji = "💕";
        } else if (percent == 100) {
            text = Textfilter[5].Text[TextMath].Text
            emoji = "💖";
        };

        var embed = new Discord.RichEmbed()
            .setTitle(`${person1.displayName} & ${person2.displayName}`)
            .addField(`${emoji} **${percent}** ${emoji}`, text)
            .setColor("#ff0000")
        await message.channel.send({ embed });
        await message.react('✅');
    } else return message.reply(`Missing arguments! **[Mentions]**`), message.react('❌');

    function getMemberFromMention(mention) {
        const matches = mention.match(/^<@!?(\d+)>$/);
        if (!matches) { return false }
        const id = matches[1];
        return message.guild.members.get(id);
    };
};