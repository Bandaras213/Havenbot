const fs = require("fs");
let CharDB = "data/characters.json"

module.exports = async (bot, message, args, Discord) => {

    let user = message.member.user
    const m = await message.channel.send(`${user}, Deleting your Character Data... Give me a sec...`);

    let CharDBobj = JSON.parse(fs.readFileSync(CharDB, 'utf8'));
    let finddiscid = CharDBobj.characters.findIndex(did => did.discid == user.id);

    if (finddiscid !== -1) {
        CharDBobj["characters"].splice(finddiscid, 1);

        fs.writeFile(CharDB, JSON.stringify(CharDBobj, null, 2), 'utf8', (err) => {
            if (err) bot.log("Unable to write file", "Error");
        });

        await m.edit(`${user}, Sucessfully deleted your Character Data!`);
    } else {
        m.edit(`${user}, You don't have a Character saved!`);
    };

};
