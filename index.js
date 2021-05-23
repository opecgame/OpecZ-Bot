const Discord = require("discord.js");
const ogn = require("open-graph-scraper")
const request = require('request');
const config = require("./config.json");
const client = new Discord.Client();
const { exec } = require("child_process");
const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);

client.on("ready", () => {
	client.user.setStatus('Online')
	client.user.setActivity(`Prefix [`+ config.prefix +`]`);
	console.log(config.namebot + ` Was start !`);
	client.channels.fetch(config.logsroom)
    .then(channel => {
      const hello = new Discord.MessageEmbed()
      hello.setColor('#5cf000')
      hello.setTitle(config.namebot +' Started !')
      hello.setDescription('Started by Discord.js')
      hello.setTimestamp() 
        channel.send({embed: hello});
    })
})

client.on("message", message => {
const args = message.content.trim().split(/ +/g);
const command = args.shift().toLowerCase();

if(command == config.prefix + "nhentai"){
  if(message.channel.nsfw) {
      request.get('https://api.opecgame.online/nhentai?ids=' + args[0] , (err, res, body) => {
      if (err) {
      const err = new Error('The message');
      console.error(err.message);
      } else {
          const nhentai = require('nhentai');
          const api = new nhentai.API();
          api.fetchDoujin(body).then(doujin => {
              const nhentaiem = new Discord.MessageEmbed()
          .setColor('#ff0000')
          .setTitle('Nhentai Random - '+ doujin.titles.pretty)
          .setURL('https://nhentai.net/g/'+ body + '/')
          .setDescription('tag : '+ doujin.tags.map(tag => tag.name).join(', '))
          .setImage(doujin.cover.url)
          .setTimestamp()
          .setFooter("Bot by OpecZ CH");
          message.channel.send({embed: nhentaiem}).then(function (message) {
            message.react("❤")
            message.react("🖤")
          })
		  
          });
      }})
  } else {
    let { MessageEmbed } = require("discord.js");
    let sfw = new MessageEmbed()
    .setTitle(`HContent Protect`)
    .setDescription('เนื้อหาต่อไปนี้เหมาะสำหรับห้อง NSFW เท่านั้น')
    .setColor("#ff0000");
  sfw.setTimestamp();
  message.channel.send(sfw).catch(console.error);
  }

}

if(command == config.prefix + "hentaithai"){
  if(message.channel.nsfw) {
	  request.get('https://api.opecgame.online/hentaithai?ids=' + args[0] , (err, res, body) => {
      if (err) {
      const err = new Error('The message');
      console.error(err.message);
      } else {
		  const ogs = require('open-graph-scraper');
			const options = { url: ('https://hentaithai.net/forum/index.php?topic='+ body +'.0/') };
			ogs(options).then((doujinth) => {
				const {result} = doujinth;
				const hentaithaiem = new Discord.MessageEmbed()
									.setColor('#ff0000')
									.setTitle('HentaiThai Random - '+ result.ogTitle)
        							.setURL('https://hentaithai.net/forum/index.php?topic='+ body + '.0/')
        							.setImage(result.ogImage.url)
        							.setTimestamp()
        							.setFooter("Bot by OpecZ CH");
				message.channel.send({embed: hentaithaiem}).then(function (message) {
					message.react("❤")
					message.react("🖤")
			})
			});		  	  
      }})
  } else {
    let { MessageEmbed } = require("discord.js");
    let sfw = new MessageEmbed()
    .setTitle(`HContent Protect`)
    .setDescription('เนื้อหาต่อไปนี้เหมาะสำหรับห้อง NSFW เท่านั้น')
    .setColor("#ff0000");
  sfw.setTimestamp();
  message.channel.send(sfw).catch(console.error);
  }

}

if(message.content == config.prefix + 'reboot-core') {
  if(message.author.id == config.adminid) {
    let { MessageEmbed } = require("discord.js");
    let reboots = new MessageEmbed()
    .setTitle(`Reboot System`)
    .setDescription("ทำการเริ่มระบบใหม่อีกครั้ง")
    .setColor("#F8AA2A");
  reboots.setTimestamp();
  message.channel.send(reboots).catch(console.error);
  setTimeout(() => {
    process.kill(process.pid, 'SIGTERM')
  }, 2000)
} else {
  let { MessageEmbed } = require("discord.js");
    let reboota = new MessageEmbed()
    .setTitle(`Reboot System`)
    .setDescription('แกไม่มีสิทธิ์')
    .setColor("#ff0000");
  reboota.setTimestamp();
  message.channel.send(reboota).catch(console.error);
}}	
	
if(message.content == config.prefix + "kill"){
	message.channel.send('https://gfycat.com/cavernoustastybudgie');
}


    if (message.content == config.prefix + 'fishing') {
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(827152002328952842, 'fishing').then(async invite => {
                return message.channel.send(`✅ | กดที่นี่เพื่อเข้า **Fishing** ${invite.code}`);
            });
        };
    };
	
	if (message.content == config.prefix + 'poker') {
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'poker').then(async invite => {
                return message.channel.send(`✅ | กดที่นี่เพื่อเข้า **Poker Night** ${invite.code}`);
            });
        };
    };
	
	if (message.content == config.prefix + 'ytt') {
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
                return message.channel.send(`✅ | กดที่นี่เพื่อเข้า **Youtube Together** ${invite.code}`);
            });
        };
    };
	
	if (message.content == config.prefix + 'bry') {
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'betrayal').then(async invite => {
                return message.channel.send(`✅ | กดที่นี่เพื่อเข้า **Bettrayal.io** ${invite.code}`);
            });
        };
    };



})

client.login(config.token);

