const db = require("quick.db");

module.exports.run = async (bot, message, args, tools) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(":x: || Not enought permissions!")
	.then(msg => msg.delete({
		timeout: 10000
	}));
if (!args.join(' ')) return message.channel.send(':x: || Please provide a prefix to change server prefix')
	.then(msg => msg.delete({
		timeout: 10000
	}));

db.set(`prefix_${message.guild.id}`, args.join(' '))
	.then(i => {
		message.channel.send(`Server Prefix has been changed to ${i}`);
	})
}

module.exports.help = {
  name: "set-prefix"
}
