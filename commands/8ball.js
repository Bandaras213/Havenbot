module.exports = (bot, message, args, Discord, moment) => {
    var eightball = [
        //Yes
        "Yes Hun.",
        "....Technically ya.",
        "Isn’t it obvious? DUH!",
        "You’re 100% correct babycakes",
        "I’m as sure of it as I am that Emilia is trash.",
        "I’m going to start charging for this bs. The answer is yes. Congratulations, you win nothing",
        "But of course.",
        "YES! The answer is YES! I know that shit to be true.",
        "By the power invested in my Astrologican cards, all signs are pointing to yes.",
        "Most would disagree but I’m a rebel, yes doll.",
        "mmmm yes.. FUCK YES. Uh uh. That’s right, yes.",
        "That’s 100% correct. I know it, I feel it, so it is written, so it shall be done.",

        //Maybe
        "Uhhhhhhh 😫",
        "Potentially",
        "That’s a tough one to answer. You might need to speak to your therapist instead.",
        "Oh lord, you already know the answer.",
        "Dont ask me questions like that.",
        "I’m bored with you already, ask someone else.",

        //No
        "Absolutely not.",
        "You TRIED it.. no.",
        "No Hun.",
        "Pahahahaha don’t be so stupid",
        "Do I need to answer that really? Of course not.",
        "No I don’t see it in the past, present or future.",
    ];

    if (!args[1]) return message.reply(`Missing argument! **[Question]**`), message.react('❌');
    var embed = new Discord.RichEmbed()
        .addField(`❓${message.member.displayName} asked:`, `${args.slice(0).join(" ")}`, false)
        .addField(`❗The Answer is:`, `${eightball[Math.floor(Math.random() * eightball.length)]}`, false)
        .setColor(message.guild.roles.find(r => r.name === "Commander").hexColor);
    message.delete();
    message.channel.send({ embed });

};