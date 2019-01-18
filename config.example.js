const config = {
  Discord: {
    TOKEN: process.env.TOKEN || 'Token',
    LOG_SERVER: 'server id',
    LOG_CHANNEL: 'channel id',
    PREFIX: 's!'
  },
  Express: {
    HTTP_PORT: 2685,
    HTTPS_PORT: 2686,
    CRT_FILE: './file.crt',
    KEY_FILE: './file.key'
  },
  DEBUG: true,
  LinkList: [
    'http://ggmail.com',
    'http://geogle.com',
    'http://ghogle.com',
    'http://goigle.com',
    'http://googae.com',
    'http://googee.com',
    'http://googhe.com',
    'http://googln.com',
    'http://googlo.com',
    'http://googme.com',
    'http://googre.com',
    'http://googte.com',
    'http://goolle.com',
    'http://goonle.com',
    'http://gooqle.com',
    'http://gooxle.com',
    'http://gooyle.com',
    'http://gopgle.com',
    'http://gpogle.com',
    'http://guogle.com',
    'http://youtubd.com',
    'http://youtubs.com',
    'http://youtubu.com'
  ],
  REDIRECT_WAIT_TIME: 15000,
  SCANNED_LINKS_LOG: 'scannedLinks.log',
  SCAM_LINK_LOG: 'scamLinks.log',
  HEADLESS: true,
  WHOIS_API_KEY: ''
}
module.exports = config
