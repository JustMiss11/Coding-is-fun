const Discord = require("discord.js");
const prefix = "</>";
const db = require("quick.db");
const fs = require("fs");

const bot = new Discord.Client();
bot.commands = new Discord.Collection()

fs.readdir('./commands', (err, files) => {
if (err) console.log(err)

let jsfile = files.filter(f => f.split(".").pop() === 'js')
if (jsfile.length <= 0) return console.log("Cmds not found!")
console.log(`Loaded ${jsfile.length} cmds`)
jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`)
    bot.commands.set(props.help.name, props)
})
 })


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


bot.on("message", async message => {
       //quick.db
       let fetched = await db.fetch(`prefix_{message.guild.id}`);
       if(fetched === null) prefix = "</>";
       else prefix = fetched;
       //bot
       
       if(message.author.bot) return;
       if(!message.content.startsWith(prefix)) return;
       if(message.channel.dm) return message.author.send("Commands wont work in here.");
       let messageArray = message.content.split(" ");
       let cmd = messageArray[0];
       let content = message.content;
       let author1 = message.author.username;
       let user = message.mentions.members.first();
       let args = messageArray.slice(1)
       
       //HELP CMD
       if(cmd === `${prefix}help`) {
         var embed = new Discord.RichEmbed()
         .setAuthor(`${message.guild.name}`)
         .addField("serverInfo", "Shows info about server")
         .addField("serverIcon", "Shows icon of the server")
         .setColor("GREEN");
         message.channel.send(embed)
       }
       //SERVER ICON CMD
       if(cmd === `${prefix}serverIcon`){
              var embed = new Discord.RichEmbed()
              .setAuthor(`${message.guild.name}`)
              .setImage(message.guild.iconURL)
              .setColor("BLUE");
              message.channel.send(embed)
       }
       if(cmd === `${prefix}set-prefix`){
         if(!message.member.hasPermission('MANAGE_SERVER')) return message.channel.send(":x: || **You dont have Manage Server permission!");
         
         db.set(`prefix_{message.guild.id}`, args.join(" ")).then(i => {
                message.channel.send(`:white_check_mark: || **Sucesfully changed prefix for this guild.** ({i})`);
         })
       }
        
            
}); //reload
bot.login(process.env.token)
