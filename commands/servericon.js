const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  var embed = new Discord.RichEmbed()
              .setAuthor(`${message.guild.name}`)
              .setImage(message.guild.iconURL)
              .setColor("BLUE");
              message.channel.send(embed)
}

module.exports.help = {
  name: "server-icon"
}
