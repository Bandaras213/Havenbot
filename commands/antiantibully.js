const Canvas = require('canvas');
const snekfetch = require("snekfetch");
const fs = require("fs");

const applyText = (canvas, text, fontsize, style) => {
    const ctx = canvas.getContext('2d');

    do {
        ctx.font = `${style} ${fontsize -= 2}px Arial`;
    } while (ctx.measureText(text).width > 380);
    return ctx.font;
};

module.exports = async (bot, message, args, Discord, moment) => {

    let user = message.member.user
    const mes = await message.channel.send(`Akari wants to bully some nerds.`);
    let colorjson = "color.json";
    let lazytext = "Please use -Text -Color -Color"

    let custom = args.join(" ").toUpperCase();
    const brgs = custom;
    const parts = brgs.split("-");
    parts.shift();
    let part1 = parts[0];
    let part2 = parts[1];

    if (part1 === undefined) {
        part1 = lazytext
    } else if (part2 === undefined) {
    } else {
        part2 = parts[1].replace(/ /g, "");
    };

    let part3 = parts[2];
    if (part3 === undefined) {
    } else {
        part3 = parts[2].replace(/ /g, "");
    };

    let counter = 0;
    for (let i = 0; i < parts.length; i++)
        if (parts[i] != null)
            counter++;

    let customText
    switch (counter) {
        case 0:
            return mes.edit(`${user} ${lazytext} for this command.`);
        case 1:
            customText = part1;
            break;
        case 2:
            customText = part1;
            break;
        case 3:
            customText = part1;
            break;
        case 4:
            customText = part1;
            break;
        case 5:
            return mes.edit(`LOL it broke`);
    };

    let color0
    if (part3 === undefined) {
        color0 = "black";
    } else {
        color0 = part3;
    };

    let color1
    if (part2 === undefined) {
        color1 = "white";
    } else {
        color1 = part2;
    };

    console.log("The brgs String:", brgs);
    console.log("How many Strings are in brgs:", counter);
    console.warn("Start of the Parts variable");
    console.log("Full parts string", parts);
    console.log("Part 1 of parts:", part1);
    console.log("Part 2 of parts:", part2);
    console.log("Part 3 of parts:", part3);
    console.log("Start of the color strings");
    console.log("Color 1:", color0);
    console.log("Color 2:", color1);

    const canvas = Canvas.createCanvas(400, 400);
    const ctx = canvas.getContext('2d');
    const { body: buffer } = await Canvas.loadImage('./img/antiantibully.jpeg');
    const bg = await Canvas.loadImage(buffer);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    ctx.font = applyText(canvas, `${customText}`, 60, "bold");
    ctx.strokeStyle = color0;
    ctx.fillStyle = color1;
    ctx.lineWidth = 6;
    ctx.miterLimit = 2;
    ctx.textAlign = "center";
    ctx.strokeText(`${customText}`, 200, 375);
    ctx.fillText(`${customText}`, 200, 375);

    const attachment = new Discord.Attachment(canvas.toBuffer(), `antiantibullyranger.png`);
    setTimeout(function () {
        mes.delete();
        message.channel.send(`${user} summoned the Anti Anti Bully Ranger`, (attachment));
    }, 3500);
}
