module.exports = async (bot, message, args, Discord, moment) => {
    let percent = Math.round(Math.random() * 100);
    let text
    let emoji
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
            text = "If an embarassing, emotional yet memorable appearance on Jerry Springer is what you're aiming for in life then you should definitely give this relationship a go.";
            emoji = "🚫";
        } else if (percent > 10 && percent < 31) {
            text = "I wouldn't bother if I were you. The story of it not working out is probably going to be too boring to tell anyone anyway.";
            emoji = "💢";
        } else if (percent > 30 && percent < 51) {
            text = "I've heard that if you buy someone enough pizza they can really grow to like you. Maybe that's one thing you could try. I wouldn't hold my breath though.";
            emoji = "💔";
        } else if (percent > 50 && percent < 71) {
            text = "Y'know. This _could_ work, or it _might_ not.";
            emoji = "💘";
        } else if (percent > 70 && percent < 100) {
            text = "You guys would probably be just fine together! Go on, give each other a lil smooch.";
            emoji = "💕";
        } else if (percent == 100) {
            text = "You pair are just meant to be together. Aww. Don't forget to invite us to the wedding!";
            emoji = "💖";
        };

        var embed = new Discord.RichEmbed()
            .setTitle(`${person1.displayName} & ${person2.displayName}`)
            .addField(`${emoji} **${percent}** ${emoji}`, `${text}`)
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

