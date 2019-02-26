const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
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

module.exports.help = {
  name: "server-info"
}
