module.exports = (bot, member, moment) => {
    var VisRole = member.guild.roles.find("name", "Visitor");
    member.addRole(VisRole);
    member.guild.channels.find("name", "main").send(`Welcome ${member.user} to the ${member.guild} Discord! **Please make sure to read <#418201549597048844> to get access to all Channels!** <:Haven:430425064589230082>`);
    member.guild.channels.find("name", "memberlog").send(`:inbox_tray: **Joined the ${member.guild} Server:** User: ${member.user} | Displayname: ${member.displayName} | Tag: ${member.user.tag} | Discord ID: ${member.id} | Has Discord since ${moment(member.user.createdAt).format('dddd, DD/MM/YYYY')} :inbox_tray:`);
    bot.log(`${member.user.username} joined the ${member.guild} Server`);
};