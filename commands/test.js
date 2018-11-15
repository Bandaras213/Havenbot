let fs = require('fs')

let MangaBase = "data/manga.json"

module.exports = (bot, message, args, Discord, moment) => {
    var id = 100190092
    var brgs = args.join(" ").toLowerCase();

    var MANGAObject = JSON.parse(fs.readFileSync(MangaBase, 'utf8'));

    console.log(MANGAObject.Manga);

    if (!MANGAObject.Manga.find(o => o.name == `${brgs}`)) {
        MANGAObject["Manga"].push(
            {
                name: `${brgs}`,
                id: `${id}`
            });

        console.log(MANGAObject.Manga);

        fs.writeFile(MangaBase, JSON.stringify(MANGAObject, null, 2), 'utf8', (err) => {
            if (err) bot.log("Unable to write file", "Error");
        });

    } else {
        return message.channel.send(`${brgs} is already in the list try using €sad ${brgs}`);
    };
};