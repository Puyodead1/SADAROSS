const puppeteer = require('puppeteer')
const config = require('./config')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()

/**
 * Discord Events
 */
client.on('ready', () => {
  console.log(`Discord Ready!`)
  const logChannel = client.guilds
    .get(config.Discord.LOG_SERVER)
    .channels.get(config.Discord.LOG_CHANNEL)
  const readyEmbed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setDescription(`SATAROSS Systems Online and Ready!`)
    .setThumbnail(
      'https://cdn.pixabay.com/photo/2014/04/02/11/01/tick-305245_960_720.png'
    )
    .setTimestamp()
    .setFooter(
      `SATAROSS by Puyodead1 and Puyodead1 Development`,
      client.user.avatarURL
    )
  logChannel.send(readyEmbed)
})
client.on('error', err => {
  console.log(`Got an error from discord x_x. ${err}`)
})

/**
 * Initalize Discord
 */
async function initDiscord () {
  await client.login(config.Discord.TOKEN)
}

// Main function
async function initSATAROSS () {
  initDiscord().then(async () => {
    console.log(`SATAROSS Ready and Started!`)
  })
  // I forgot what this even fucking does....
  let counter = 0

  // Get current date and time
  let currentTime = await require('./Utils/utils').getDateAndTime()

  while (true) {
    for (let link of config.LinkList) {
      const browser = await puppeteer.launch({
        /**
         * headless sets whether a browser page is displayed or not
         * set to false to see a browser window
         * set to true to run invisible
         */
        headless: false
      })
      const page = await browser.newPage()
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko'
      )
      await page.setViewport({
        width: 1920,
        height: 1080
      })
      await page.goto(link)

      // Wait for page to fully load/redirect
      await require('./Utils/utils').wait(config.REDIRECT_WAIT_TIME)

      // Write the link
      fs.appendFile(
        config.SCANNED_LINKS_LOG,
        currentTime + ' ' + page.url() + '\n',
        err => {
          if (err) throw err
        }
      )
      //

      const found = /virus|infected|pornographic|spyware|riskware|blocked|locked|toll/.test(
        await page.content()
      )

      // This will print true or false
      console.log(found)
      if (found) {
        console.log('posible scam site')
        await page.screenshot({
          path: './data/' + currentTime + '.png'
        })
        client.guilds
          .get(config.Discord.LOG_SERVER)
          .channels.get(config.Discord.LOG_CHANNEL)
          .send('Possible Scam Site Found!', {
            file: './data/' + currentTime + '.png'
          })
      }
      counter++
      await browser.close()
    }
  }
}

// initDiscord()
initSATAROSS()
