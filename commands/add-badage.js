const db = require("quick.db");

module.exports.run = async (bot, message, args, tools) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(":x: || Not enought permissions!")
	.then(msg => msg.delete({
		timeout: 10000
	}));
	
  var user = message.author ||  message.mentions.users.first();
  var reason = args.join(" ").slice(22);
  const bandage = await db.fetch(`bandages_${user.id}`)
  const reason1 = await db.fetch(`reason_${user.id}`)
  
  if(!reason) return message.reply(", specify a bandage!");
	
  db.add(`bandages_${user.id}`, 1)
  db.push(`reason_${user.id}`, reason)

  var embed = new Discord.RichEmbed()
  .addField("Succesfully added bandage!", "You added bandage and it was succesful!")
  .setColor("GREEN")
  .setAuthor("Succes!");
  message.channel.send(embed)
}

module.exports.help = {
  name: "add-bandage"
}
