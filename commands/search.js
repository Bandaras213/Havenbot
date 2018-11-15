let cheerio = require('cheerio')
let request = require('request')
let fs = require('fs')
let google = require('google')

module.exports = (bot, message, args, Discord, moment) => {
  
let custom = args.join(' ') + ' site:mangarock.com inurl:manga -inurl:chapter'
let filter = args.join(' ')

google.resultsPerPage = 7

google(custom, async function (err, res) {
  if (err) console.error(err)
  console.log(res.links)
let t0 = res.links[0].title.split('-')
let t1 = res.links[1].title.split('-')
let t2 = res.links[2].title.split('-')
let t3 = res.links[3].title.split('-')
let t4 = res.links[4].title.split('-')
let t5 = res.links[5].title.split('-')
let t6 = res.links[6].title.split('-')

let l0
if (res.links[0].link == null ) {
  l0 = "XXXXX"
} else{
l0 = res.links[0].link.split('-')
};
let l1
if (res.links[1].link === null) {
  l1 = "XXXXX"
} else{
l1 = res.links[1].link.split('-')
};
let l2
if (res.links[2].link === null) {
  l2 = "XXXXX"
} else{
l2 = res.links[2].link.split('-')
};
let l3
if (res.links[3].link === null) {
  l3 = "XXXXX" 
} else{
l3 = res.links[3].link.split('-')
};
let l4
if (res.links[4].link === null) {
  l4 = "XXXXX" 
} else{
l4 = res.links[4].link.split('-')
};
let l5
if (res.links[5].link === null) {
  l5 = "XXXXX" 
} else{
l5 = res.links[5].link.split('-')
};
let l6
if (res.links[6].link === null) {
  l6 = "XXXXX" 
} else{
l6 = res.links[6].link.split('-')
};
  
//define the embed
    let embed = {
        "color": 65280,
        "author": {
            "name": `Bitte auswählen`,
        },
        "footer": {
            "text": `Antworte mit ner zahl von 0 bis 7`,
        },
        "fields": [
            {
                "name": t0[0] + t0[1],
                "value": l0[2].replace("/chapter/mrs", ""),
                "inline": true
            },
            {
                "name": t1[0] + t1[1],
                "value": l1[2].replace("/chapter/mrs", ""),
                "inline": true
            },
            {
                "name": t2[0] + t2[1],
                "value": l2[2].replace("/chapter/mrs", ""),
                "inline": true
            },
            {
                "name": t3[0] + t3[1],
                "value": l3[2].replace("/chapter/mrs", ""),
                "inline": true
            },
            {
                "name": t4[0] + t4[1],
                "value": l4[2].replace("/chapter/mrs", ""),
                "inline": true
            },
            {
                "name": t5[0] + t5[1],
                "value": l5[2].replace("/chapter/mrs", ""),
                "inline": true
            },
            {
                "name": t6[0] + t6[1],
                "value": l6[2].replace("/chapter/mrs", ""),
                "inline": true
            },
            {
              	"name": "None of the above",
                "value": "None of the above",
                "inline": true
            },
        ]
    }

    //send the embed
  await message.channel.send({ embed });

    //wait for and collect 1 message for 10 seconds
    let msgs = await message.channel.awaitMessages(msg => {
        return msg.content;
    }, { max: 1, time: 10000 });
  
  //making sure message is a number
    if (Number.isInteger(parseInt(msgs.map(msg => msg.content)))) {

        //string content to int and checking if its bigger than 7
        let msgint = parseInt(msgs.map(msg => msg.content), 10);
        if (msgint === NaN || msgint > 7) {
            return message.channel.send("ich brauch ne zahl von 0 bis 7 du retardo")
        }

        //switch statement for all the possible cases
        switch (msgint) {
            case 0:
                message.channel.send("Nummer 0 wurde ausgewählt");
                break
            case 1:
                message.channel.send("Nummer 1 wurde ausgewählt");
                break
            case 2:
                message.channel.send("Nummer 2 wurde ausgewählt");
                break
            case 3:
                message.channel.send("Nummer 3 wurde ausgewählt");
                break
            case 4:
                message.channel.send("Nummer 4 wurde ausgewählt");
                break
            case 5:
                message.channel.send("Nummer 5 wurde ausgewählt");
                break
            case 6:
                message.channel.send("Nummer 6 wurde ausgewählt");
                break
            case 7:
                message.channel.send("Nummer 7 wurde ausgewählts");
                break
            case 8:
            		message.channel.send("Number 8 got chosen");
            		break
        };

        //if its not a number just return
    } else {
        return message.channel.send("ich brauch ne zahl von 1 bis 7 du retardo")
}})}