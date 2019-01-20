const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  // eslint-disable-line no-unused-vars
  const msg = await message.channel.send(`🤔`)
  let embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setTitle('Pong!')
    .setFooter(`SATAROSS by Puyodead1`, client.user.avatarURL)
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
    .addField(
      'Bot Latency',
      `${msg.createdTimestamp - message.createdTimestamp}ms`,
      true
    )
    .addField('API Latency', `${Math.round(client.ping)}ms`, true)
  msg.edit(embed)
}

exports.help = {
  name: 'ping',
  category: 'Miscelaneous',
  description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
  usage: 'ping'
}
