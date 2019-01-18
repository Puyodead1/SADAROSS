const config = require('../config')
const Discord = require('discord.js')
const request = require('request')
const fs = require('fs')

exports.run = async (client, msg, args) => {
  request(
    `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${
      config.WHOIS_API_KEY
    }&domainName=${args[0]}&outputFormat=JSON`,
    async function (err, response, body) {
      if (err) console.log(err)
      let json = JSON.parse(body)
      let embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setTimestamp()
        .setDescription(
          `WHOIS Information for ${json.WhoisRecord.registrant.organization}`
        )
        .addField(`Registrant`, json.WhoisRecord.registrant.organization, true)
        .addField(`Registrant State`, json.WhoisRecord.registrant.state, true)
        .addField(
          `Registrant Country`,
          `${json.WhoisRecord.registrant.country}/${
            json.WhoisRecord.registrant.countryCode
          }`
        )
        .addField(`Domain Name`, json.WhoisRecord.domainName, true)
        .setFooter(
          `WHOIS Information requested by ${msg.author.username}`,
          msg.author.avatarURL
        )

      fs.writeFile(`./data/${json.WhoisRecord.domainName}.json`, body, err => {
        if (err) throw err
      })

      await msg.channel.send(embed)
    }
  )
}
exports.help = {
  name: 'whois',
  category: 'Bot',
  description: 'Get whois info',
  usage: 'whois'
}
