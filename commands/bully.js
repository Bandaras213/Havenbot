const Canvas = require('canvas');
const snekfetch = require("snekfetch");
const fs = require("fs");

const applyText = (canvas, text, fontsize, style) => {
    const ctx = canvas.getContext('2d');

    do {
        ctx.font = `${style} ${fontsize -= 2}px Arial`; /*nice font meme*/
    } while (ctx.measureText(text).width > 380);
    return ctx.font;
};

// Message handler weil REEEEEEEEE
module.exports = async (bot, message, args, Discord, moment) => {

    let user = message.member.user
    const mes = await message.channel.send(`Started the ritual to summon an ancient being for ${user}`);
    let colorjson = "color.json";
    let lazytext = "Please use -Text -Color -Color"
  
    let custom = `${args.join(" ").toUpperCase()}`;
    const brgs = custom;
    const parts = brgs.split("-");
    let part1 = parts[1];
    let part2 = parts[2];
    if (part2 === undefined){
    }else
    {
        part2 = parts[2].replace(/ /g, "");
    } 
    let part3 = parts[3];
    if (part3 === undefined){
    }else
    {
       part3 = parts[3].replace(/ /g, "");
    }
    let counter = 0;
    for (let i = 0; i < parts.length; i ++)
    if (parts[i] != null)
        counter ++;
  
    let customText /*bessere meme*/
    switch(counter){
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
   
  /*  let colfil = JSON.parse(fs.readFileSync(colorjson, 'utf8'));
   
    colfil.forEach(JSON.parse(colfil), function (idx, obj) {
    if (obj.color == `${part2}`) {
    }else
    {
      part2 === undefined;
    };
    });
  
    colfil.forEach(JSON.parse(colfil), function (idx, obj) {
    if (obj.color == `${part3}`) {
    }else
    {
      part3 === undefined;
    };
    })
  */
    let color0
    if (part3 === undefined) {
      color0 = "white";
    }else
    {
      color0 = part3;
    };

    let color1
    if (part2 === undefined) {
      color1 = "black";
    }else
    {
      color1 = part2;
    };
    
    console.log("The brgs String:", brgs);
    console.log("How many Strings are in brgs:", counter);
    console.warn("Start of the Parts variable");
    console.log("Full parts string", parts);
    //console.group();
    console.log("Part 1 of parts:", part1);
    //console.group();
    console.log("Part 2 of parts:", part2);
    //console.group();
    console.log("Part 3 of parts:", part3);
    //console.groupEnd();
    console.log("Start of the color strings");
    //console.group();
    console.log("Color 1:", color0);
    //console.group();
    console.log("Color 2:", color1);
    //console.groupEnd();
    //console.debug();
    //console.log(colfil);
  
    const canvas = Canvas.createCanvas(400, 400);
    const ctx = canvas.getContext('2d');
    const { body: buffer } = await snekfetch.get('https://cdn.glitch.com/f7b3eaee-b74f-4adb-8a42-64ad7d305bc0%2Fbully.jpeg?1538149367561');
    const bg = await Canvas.loadImage(buffer);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
   
    ctx.font = applyText(canvas, `${customText}`, 60,"bold");
    ctx.strokeStyle = color0;
    ctx.fillStyle = color1;
    ctx.lineWidth = 6;
    ctx.miterLimit=2;
    ctx.textAlign = "center";
    ctx.strokeText(`${customText}`, 200, 375);
    ctx.fillText(`${customText}`, 200, 375);

    //HOW TO POST CANVAS GIF
    /*just do it like this LOOOOOOOOOOOOOOOOOOOOOOOOOOOOL*/
    const attachment = new Discord.Attachment(canvas.toBuffer(), `antibullyrangermeme.png`);    
    setTimeout(function () {
    mes.delete();
    message.channel.send(`${user} summoned the Anti Bully Ranger`, (attachment));
    }, 3500);
}
