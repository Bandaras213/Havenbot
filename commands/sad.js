let cheerio = require('cheerio')
let request = require('request');

module.exports = async (bot, message, args, Discord, moment) => {

    let user = message.member.user
    if (args.length != 1) {
        return message.channel.send(`${user}, **[Missing or Invalid Manga Rock Id:]** manga/mrs-serie-__**XXXXXXXXXXXX**__`), message.react('❌');
    };
       var cil = [];
  		 //var thl = [];
  		 var linkpart = 'https://mangarock.com';

      request('https://mangarock.com/manga/mrs-serie-' + `${args[0]}`, function(err, resp, html) {
        if (!err){
          const B = cheerio.load(html);

      let color = Math.floor(Math.random() * 16777214) + 1;
			let title = B('meta[property="og:title"]').attr('content')
      
      let author = B('span[itemprop=name]')
      let a = author.contents().map(function() {
      return (this.type === 'text') ? B(this).text()+'' : '';
      }).get().join(', ').split(/ + /g);
          
      let description = B('div[itemProp=articleBody]').text()
      
      let genre = B('.Jhc16')
      var g = genre.contents().map(function() {
      return (this.type === 'text') ? B(this).text()+'' : '';
      }).get().join(', ').split(/ + /g);
          
      let chapter = B('._2jVBw span')
      var c = chapter.contents().map(function() {
      return (this.type === 'text') ? B(this).text()+' ' : '';
      }).get().join(' ').split(/ + /g);
          
      let icon = "https://cdn.glitch.com/6c4ee57a-98bb-4529-bdb6-6cdae6819a5e%2FIMG_20181101_021328.jpg?1541035006433"
      let banner = B('meta[itemProp="image"]').attr('content')
      
      /*let thumbnailget = B('._2NpIB a').each(function() {
      var thumbnailer = B(this).attr('href');
      thl.push(thumbnailer);
      });
      let thumbnail = linkpart + thl[Math.floor(Math.random() * 5) + 1]*/
      
      let url = B('meta[property="og:url"]').attr('content')
      
      let chapterindex = B('[class="_2dU-m _1qbNn"]')
      var ci = chapterindex.contents().map(function() {
      return (this.type === 'text') ? B(this).text()+' ' : '';
      }).get().join(' ').split(/ + /g);
          
      var chapterlinks = B('.ptmaY a').each(function() {
   		var links = B(this).attr('href');
   		cil.push(links);
			});
          
      let info = B('.wdxA_ td')
      var t = info.contents().map(function() {
      return (this.type === 'text') ? B(this).text()+' ' : '';
			}).get().join(' ').split(/ + /g);
          
    const embed = new Discord.RichEmbed()
  .setTitle(title)
  .setColor(color)
  .setDescription(description)
  .setFooter(title, icon)
  .setImage(banner)
 // .setThumbnail(thumbnail)
  .setTimestamp()
  .setURL(url)
  .addField('Genre:', `${g}`)
  .addField('Chapter:', `${c[0].replace(' |', '')}`)
  .addField('Status:', `${c[1].replace(' |', '')}`)
  .addField('Author:', `${a}`)
  .addField('Published:', `${t[1]}`)
  .addField('Serialization:', `${t[3]}`)
  .addField('Last Updated:', `${t[5]}`)
  .addField('Last Chapter 1/5:', `${ci[0]} ${linkpart+cil[0]}`) 
  .addField('Last Chapter 2/5:', `${ci[1]} ${linkpart+cil[1]}`)
  .addField('Last Chapter 3/5:', `${ci[2]} ${linkpart+cil[2]}`)
  .addField('Last Chapter 4/5:', `${ci[3]} ${linkpart+cil[3]}`)
  .addField('Last Chapter 5/5:', `${ci[4]} ${linkpart+cil[4]}`)
 
  message.channel.send(`${user}, Here is the result for ${title}`, {embed});
}})}