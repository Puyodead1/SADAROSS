const config = require('../config')
const Discord = require('discord.js')

module.exports = async client => {
  let logChannel = client.guilds
    .get(config.Discord.LOG_SERVER)
    .channels.get(config.Discord.LOG_CHANNEL)
  console.log(`Discord Ready!`)
  const readyEmbed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setDescription(`SATAROSS Systems Online and Ready!`)
    .addField(`Headless`, config.HEADLESS, true)
    .addField(`Redirect Wait Time`, `${config.REDIRECT_WAIT_TIME}ms`, true)
    .setThumbnail(
      'https://cdn.pixabay.com/photo/2014/04/02/11/01/tick-305245_960_720.png'
    )
    .setTimestamp()
    .setFooter(
      `SATAROSS by Puyodead1 and Puyodead1 Development`,
      client.user.avatarURL
    )
  logChannel.send(readyEmbed)
}
