const Discord = require('discord.js')
const config = require('../config.json')
const Conf = require('../Models/Config')

exports.run = async (client, msg, args) => {
  if (args.length > 2 || args.length === 0) {
    let usageEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#FF0000')
      .setDescription(`Invalid Usage`)
      .addField(`Usage`, `s!bl <domain>`, true)
      .setTimestamp()
      .setFooter(`SATAROSS by Puyodead1`, client.user.avatarURL)

    return msg.channel.send(usageEmbed)
  }
  let record = await Conf.findById(config.MONGO_ID)
  switch (args[0].toLowerCase()) {
    case '-l':
      let sites = record.SATAROSS.LINK_BLACKLIST
      if (sites.length === 0) {
        sites = 'No Blacklisted Sites'
      }
      return msg.channel.send(sites)
    case '-a':
      let blackList = record.SATAROSS.LINK_BLACKLIST || []
      blackList.push(args[1])
      await Conf.findByIdAndUpdate(config.MONGO_ID, {
        SATAROSS: { LINK_BLACKLIST: blackList }
      }).then(async () => {
        msg.channel.send(`Updated Blacklist. ${blackList}`)
      })
      blackList = []
  }
  msg.delete()
}
exports.help = {
  name: 'bl',
  category: 'Bot',
  description: 'Blacklist Managment',
  usage: 'bl'
}
