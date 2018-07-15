module.exports = (bot, member, moment) => {
    member.guild.channels.find("name", "memberlog").send(`:outbox_tray: **Left the ${member.guild} Server:** User: ${member.user} | Displayname: ${member.displayName} | Tag: ${member.user.tag} | Discord ID: ${member.id} | Joined ${member.guild} on ${moment(member.joinedAt).format('dddd, DD/MM/YYYY')} :outbox_tray:`);
    bot.log(`${member.user.username} left the ${member.guild} Server`);
};