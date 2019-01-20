const config = require('../config.json')
const Discord = require('discord.js')

module.exports = async client => {
  let logChannel = client.guilds
    .get(config.DISCORD.LOG_SERVER)
    .channels.get(config.DISCORD.LOG_CHANNEL)
  console.log(`Discord Ready!`)
  client.user.setActivity(`I NEED A GIRL (AND A LIFE)`, { type: 'STREAMING' })
  const readyEmbed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setDescription(`SATAROSS Systems Online and Ready!`)
    .addField(`Mode`, client.mode, true)
    .addField(`Headless`, config.SATAROSS.HEADLESS, true)
    .addField(
      `Redirect Wait Time`,
      `${config.SATAROSS.REDIRECT_WAIT_TIME}ms`,
      true
    )
    .setThumbnail(
      'https://cdn.pixabay.com/photo/2014/04/02/11/01/tick-305245_960_720.png'
    )
    .setTimestamp()
    .setFooter(
      `SATAROSS by Puyodead1 and Puyodead1 Development`,
      client.user.avatarURL
    )
  await logChannel.send(readyEmbed)
}
