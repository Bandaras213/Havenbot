const snekfetch = require("snekfetch");

  setInterval(function() {
    module.exports = async (bot, message, args, Discord, moment) => {
    message.channel.send(`Glatze`);
   
    let buffer
    let numb

    function getRandomIntInclusive(min, max) {
  min = Math.ceil(1);
  max = Math.floor(4);
  numb = Math.floor(Math.random() * (max - min +1)) + min; 
}
      
    switch(numb){
      case 0:
        return;
	  case 1:
	  buffer = snekfetch.get("https://cdn.glitch.com/f7b3eaee-b74f-4adb-8a42-64ad7d305bc0%2Fglatzenkopf.png?1539098598845");
	  break;
	  case 2:
    buffer = snekfetch.get("https://cdn.glitch.com/f7b3eaee-b74f-4adb-8a42-64ad7d305bc0%2Ffac58bad-5513-4eb6-9d49-2186ff945880.jpg?1539098605559");
	  break;
	  case 3:
    buffer = snekfetch.get("https://cdn.glitch.com/f7b3eaee-b74f-4adb-8a42-64ad7d305bc0%2Ftobias2.png?1539098611293");
	  break;
	  case 4:
    buffer = snekfetch.get("https://cdn.glitch.com/f7b3eaee-b74f-4adb-8a42-64ad7d305bc0%2Fglatz0.png?1539098621726");
	  break;
	} ;
	
	
	const attachment = new Discord.Attachment(buffer `Glatze.png`) ;
  message.channel.send(attachment);
    }
  }, 60000)