const unirest = require('unirest')
const config = require('../config')

exports.run = async (client, msg, args) => {
  console.log(args)
  return unirest
    .get('https://jsonwhois.com/api/v1/whois')
    .headers({
      Accept: 'application/json',
      Authorization: `Token token=${config.WHOIS_API_KEY}`
    })

    .query({
      domain: 'google.com'
    })

    .end(function (response) {
      console.log(response.body)
    })
}
exports.help = {
  name: 'whois',
  category: 'Bot',
  description: 'Get whois info',
  usage: 'whois'
}
