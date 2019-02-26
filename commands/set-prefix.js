const db = require("quick.db");

module.exports.run = async (bot, message, args, tools) => {
  if(!message.member.hasPermission('MANAGE_SERVER')) return message.channel.send(":x: || **You dont have Manage Server permission!");
         
         db.set(`prefix_{message.guild.id}`, args.join(" ")).then(i => {
                message.channel.send(`:white_check_mark: || **Sucesfully changed prefix for this guild.** ({i})`);
         })
}

module.exports.help = {
  name: "set-prefix"
}
