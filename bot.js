const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} został aktywowany!`);
  bot.user.setActivity("Liczę pieniążki! $$$", {type: "WATCHING"});

  //bot.user.setGame("on SourceCade!");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


  if(cmd === `${prefix}paliwo`){

    //!report @ned this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Poprawne użycie komendy: **.paliwo @nick [Opis]**");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Raport")
    .setColor("#15f153")
    .addField("Autor:", `${message.author} podał: ${rUser} do zwrotu kosztów.`)
    .addField("Czas:", message.createdAt)
    .addField("Opis:", rreason);

    let reportschannel = message.guild.channels.find(`name`, "admin-raporty");
    if(!reportschannel) return message.channel.send("Nie znaleziono kanału do reportów.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return message.channel.send(`${message.author} pomyślnie wysłałeś raport.`);
  }




  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nazwa serwera:", message.guild.name)
    .addField("Stworzony:", message.guild.createdAt)
    .addField("Dolaczyles:", message.member.joinedAt)
    .addField("Wszystkich użytkowników:", message.guild.memberCount);

    return message.channel.send(serverembed);
  }



  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Info o bocie")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

    return message.channel.send(botembed);
  }
});


bot.login("NDQ4Mzk4ODM1NDYzNzQ5NjMz.DeVuyA.YOAHZKXKUUj-F92nQlqH463ECaQ");
