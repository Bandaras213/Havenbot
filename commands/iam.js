module.exports = async (bot, message, args, Discord, moment) => {
    let VisRole = message.member.guild.roles.find("name", "Visitor");
    let RecRole = message.member.guild.roles.find("name", "Recruit");

    if (!message.member.roles.has(VisRole.id)) {
        return message.reply(`You already have Recruit (or better) permissions!`);
    } else {
        await message.member.setNickname(`${args.join(" ")}`);
        await message.member.removeRole(VisRole);
        await message.member.addRole(RecRole);
        await message.reply(`I've changed your nickname to "${args.join(" ")}" and added you as a Recruit!`);
        await message.delete();
    }
};