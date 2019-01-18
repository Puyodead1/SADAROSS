const Discord = require('discord.js')

exports.run = async (client, msg, args) => {
  console.log(args)
  switch (args[0]) {
    /*eslint-disable*/
    case '-a':
      return msg.channel.send({ file: './scannedLinks.log' })
      break
    case '-all':
      return msg.channel.send({ file: './scannedLinks.log' })
      break
    case '-s':
      return msg.channel.send({ file: './scamLinks.log' })
      break
    case '-scam':
      return msg.channel.send({ file: './scamLinks.log' })
      break
    default:
      let dumpHelpEmbed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setTitle(`SATAROSS Development Dumping`)
        .setDescription(`Used to attach logs`)
        .addField(`All Links`, 's!dump -a or s!dump -all')
        .addField(`Scam Links Only`, 's!dump -s or s!dump -scam')
        .setTimestamp()
        .setFooter(
          `SATAROSS by Puyodead1 and Puyodead1 Development`,
          client.user.avatarURL
        )

      return msg.channel.send(dumpHelpEmbed)
      break
  }
}
exports.help = {
  name: 'dump',
  category: 'Bot',
  description: 'Attach logs',
  usage: 'dump'
}
