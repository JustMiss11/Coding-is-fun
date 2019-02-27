const Discord = require("discord.js");

exports.run = async (bot, message, args, config) => {
  var embed = new Discord.RichEmbed()
         .setAuthor(`${message.guild.name}`)
         .addField("serverInfo", "Shows info about server")
         .addField("serverIcon", "Shows icon of the server")
         .setColor("GREEN");
         message.channel.send(embed)
}

module.exports.help = {
 name: "help"
}
