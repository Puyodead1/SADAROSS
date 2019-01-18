const Discord = require('discord.js')
const config = require('../config')

exports.run = async (client, msg, args) => {
  if (args.length !== 1) {
    let usageEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#FF0000')
      .setDescription(`Invalid Usage`)
      .addField(`Usage`, `s!bl <domain>`, true)
      .setTimestamp()
      .setFooter(
        `SATAROSS by Puyodead1 and Puyodead1 Development`,
        client.user.avatarURL
      )

    return msg.channel.send(usageEmbed)
  }
  if (args.length > 2) {
    let usageEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#FF0000')
      .setDescription(`Invalid Usage`)
      .addField(`Usage`, `s!bl <domain>`, true)
      .setTimestamp()
      .setFooter(
        `SATAROSS by Puyodead1 and Puyodead1 Development`,
        client.user.avatarURL
      )

    return msg.channel.send(usageEmbed)
  }

  switch (args[0].toLowerCase()) {
    case '-l':
      let sites = config.BLACK_LIST
      if (sites.length === 0) {
        sites = 'No Sites Blacklisted Yet'
      }
      return msg.channel.send(sites)
    case '-a':
      let blackList = config.BLACK_LIST || []
      blackList.push(args[1])
      // Add it here
      blackList = []
      return console.log(' ')
  }
}
exports.help = {
  name: 'bl',
  category: 'Bot',
  description: 'Blacklist Managment',
  usage: 'bl'
}
