const Discord = require("discord.js");
const prefix = "</>";

const bot = new Discord.Client();

bot.on("ready", () => {
       console.log(`${bot.user.username} is online`)
    // bot.user.setActivity("Hello", {type: "STREAMING", url:"https://twitch.tv/Strandable"});

       let statuses = [
       //   `to ${bot.guilds.size} servers!`, //shows in how many servers I am!
          "My prefix is </>", //my Prefix!
          "start with </>help", //simple help!
          "Version: 0.1-alpha!", //Bots version!
          `around ${bot.users.size} people!` //shows how many users im managing!
       ]
//reload
    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "LISTENING"});
        bot.user.setStatus("idle"); //online, idle, dnd
    }, 5000)
});


bot.on("message", message => {
       if(message.author.bot) return;
       if(!message.content.startsWith(prefix)) return;
       if(message.channel.dm) return message.author.send("Commands wont work in here.");
       let messageArray = message.content.split(" ");
       let cmd = messageArray[0];
       let content = message.content;
       let author1 = message.author.username;
       let user = message.mentions.members.first();
       
       if(cmd === `${prefix}help`) {
         var embed = new Discord.RichEmbed()
         .setAuthor(`${message.guild.name}`)
         .addField("serverInfo", "Shows info about server")
         .setColor("GREEN");
         message.channel.send(embed)
       }
       
       if(cmd === `${prefix}serverInfo`){
              let emb = new Discord.RichEmbed()
              .setColor('00ff54')
              .setTitle('Server Info')
              .addField(`Server Name`, message.guild.name, true)
              .setThumbnail(message.guild.iconURL)
              .addField(`Owner`, message.guild.owner, true)
              .addField(`ID`, message.guild.id, true)
              .addField(`Channels Count`, message.guild.channels.size, true)
              .addField(`Roles Count`, message.guild.roles.size, true)
              .addField(`Emojis Count`, message.guild.emojis.size, true)
              .addField(`Members Count`, message.guild.members.size, true)
              .addField(`Users Count`, message.guild.members.filter(member => !member.user.bot).size, true)
              .addField(`Bots Count`, message.guild.members.filter(member => member.user.bot).size, true)
              .addField(`AFK Channel`, message.guild.afkChannel, true)
              .addField(`Server Region`, message.guild.region, true)
              .addField(`Server Created`, message.guild.createdAt, true);
              message.channel.send(emb);
       }
       if(cmd === `${prefix}serverIcon`){
              var embed = new Discord.RichEmbed()
              .setAuthor(`${message.guild.name}`)
              .setImage(message.guild.iconURL)
              .setColor("BLUE");
              message.channel.send(embed)
       }
}); //reload
bot.login(process.env.token)
