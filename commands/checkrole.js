module.exports = (bot, message, args, Discord, moment) => {

    //check if the member has the permission to use the command
    if (message.member.roles.some(r => ["Captain", "Commander",].includes(r.name))) {

        //check if args exist
        if (args[0]) {

            //role name from message
            let roleName = args.slice(0).join(" ");

            //search and find all members of the guild with the given role and get their names
            let membersWithRole = message.guild.members.filter(member => {
                return member.roles.find(r => r.name === roleName);
            }).map(member => {
                return member.displayName;
            });

            //if no members have that role return that none could be found
            if (membersWithRole === undefined || membersWithRole.length == 0) {
                return message.reply(`Invalid argument! **[Can't find any members with the role "${roleName}"]**`), message.react('❌');
            };

            //define rich embed
            let embed = new Discord.RichEmbed({
                "title": `${membersWithRole.length} Users with the ${roleName} role:`, //number of members with the role
                "description": membersWithRole.join("\n"), //join the found members with each one on a new line
                "color": `${message.guild.roles.find(r => r.name === roleName).color}`, //embed color is the same color as the role
            });

            //delete original message and send embed
            message.delete();
            message.channel.send({ embed });

            //return if no role name was given
        } else return message.reply(`Missing argument! **[Role Name]**`), message.react('❌');
    } else {

        //return if no permission
        return message.delete(), message.reply(`You dont have permission to use that command!`);
    };
};
