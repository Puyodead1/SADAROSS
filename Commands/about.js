const Discord = require('discord.js')
const config = require('../config')

exports.run = async (client, msg, args) => {
  let aboutEmbed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setDescription(`SATAROSS Information`)
    .addField(
      `Website`,
      `https://puyodead1-development.me:${config.Express.HTTPS_PORT}/`,
      true
    )
    .addField(`Developed By`, `Puyodead1`, true)
    .addField(`Support Server`, `https://discord.gg/8aqEzCR`, true)
    .setTimestamp()
    .setFooter(
      `SATAROSS by Puyodead1 and Puyodead1 Development`,
      client.user.avatarURL
    )

  return msg.channel.send(aboutEmbed)
}
exports.help = {
  name: 'about',
  category: 'Bot',
  description: 'About SATAROSS',
  usage: 'about'
}
