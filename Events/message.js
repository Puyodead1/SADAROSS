const config = require('../config')
const Discord = require('discord.js')

module.exports = async (client, msg) => {
  if (msg.author.bot) return
  if (!msg.content.startsWith(config.Discord.PREFIX)) return
  let args = msg.content
    .slice(config.Discord.PREFIX.length)
    .trim()
    .split(/ +/g)
  let command = args[0].toLowerCase()
  args.shift()

  if (command === 'dump') {
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

        return dumpHelpEmbed
        break
      /* eslint-enable */
    }
  } else if (command === 'quit') {
    if (
      msg.author.id === '213247101314924545' ||
      msg.author.id === '505466807092772865' ||
      msg.author.id === '213247101314924545'
    ) {
      if (!args.length >= 1) {
        let embed = new Discord.RichEmbed()
          .setAuthor(client.user.username, client.user.avatarURL)
          .setColor('#FF0000')
          .setDescription(`Invalid Syntax`)
          .addField(`Usage`, `s!quit <reason>`)
          .setTimestamp()
          .setFooter(
            `SATAROSS by Puyodead1 and Puyodead1 Development`,
            client.user.avatarURL
          )
        return msg.channel.send(embed)
      }
      let reason = args.join(' ')
      await msg.guild.members
        .get('213247101314924545')
        .send(`${msg.author.username} shut me down for ${reason}`)
      await msg.channel.send(
        `System Shutdown for ${reason}. Incident has been reported.`
      )
      return process.exit(0)
    } else {
      let embed1 = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setDescription(`You are not authorized to do that!`)
        .setTimestamp()
        .setFooter(
          `SATAROSS by Puyodead1 and Puyodead1 Development`,
          client.user.avatarURL
        )
      return msg.channel.send(embed1)
    }
  }
}
