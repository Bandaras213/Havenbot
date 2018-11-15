const fetch = require("node-fetch");

const fs = require("fs");
let CharDB = "data/characters.json"

module.exports = async (bot, message, args, Discord) => {

    let user = message.member.user

    //send message to confirm input
    const m = await message.channel.send(`${user}, Updating your Name and Role... Give me a sec...`);

    //check if the user already has a entry in the CharDB
    let CharDBobj = JSON.parse(fs.readFileSync(CharDB, 'utf8'));
    let finddiscid = CharDBobj.characters.findIndex(did => did.discid == user.id);

    if (finddiscid == -1) {
        return m.edit(`${user}, Looks like you haven't verified yourself! Please ask <@98605179544285184> to add you manually!`), message.react('❌');
    };
    
    let lodeID = CharDBobj.characters[finddiscid].lodeid;

    try {
        await fetch("https://xivapi.com/freecompany/9237023573225331624?data=FCM" + `&key=${bot.config.xivapikey}`)
            .then(sear => sear.json())
            .then(async sear => {
                let RecRole = message.member.highestRole;
                let FetRole;

                //if the free company or its members aren't cached use the recrole as the fet(ched)role
                if (!sear.Info.FreeCompany.State === 2) {
                    FetRole = RecRole;
                };
                if (!sear.Info.FreeCompanyMembers.State === 2) {
                    FetRole = RecRole;
                };

                //search the fc members for the ID of the character
                let searPayload = sear.FreeCompanyMembers
                let searPayloadFilter = searPayload.filter(ID => ID.ID == lodeID);

                //if theres a character with the ID in the fc use the rank name as the fetrole, if not use the recruit role
                if (searPayloadFilter[0]) {
                    FetRole = message.member.guild.roles.find(r => r.name === `${searPayloadFilter[0].Rank}`)
                } else {
                    FetRole = RecRole
                };

                //change the nickname of the user, remove the visitor role, give them the correct role, send the welcome embed to #main and delete the original messages
                await message.member.setNickname(`${searPayloadFilter[0].Name}`);
                await message.member.addRole(FetRole);
                await m.edit(`${user}, Successfully updated your Name and Role!`);
                await message.react('✅');
            });

        //catching api errors such as the very cool "Error 500: Internal Server Error" which basically means the lodestone parser broke
    } catch (error) {
        bot.log(error, "Error");
        m.edit(`${user}, Something went wrong while requesting API data, Try again in a few minutes!`), message.react('❌');
    };
};
