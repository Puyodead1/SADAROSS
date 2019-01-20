const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const ConfigSchema = new mongoose.Schema({
  SETUP_COMPLETE: {
    type: Boolean,
    default: false
  },
  SATAROSS: {
    LINK_LIST: {
      type: Array,
      default: [
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
      ]
    },
    LINK_BLACKLIST: {
      type: Array,
      default: []
    }
  }
})
ConfigSchema.plugin(timestamp)
/*eslint-disable */
const Config = mongoose.model('Config', ConfigSchema)
/* eslint-enable */
module.exports = Config
