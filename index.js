const puppeteer = require('puppeteer')
const config = require('./config')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
var logChannel
/**
 * Discord Events
 */
client.on('ready', () => {
  logChannel = client.guilds
    .get(config.Discord.LOG_SERVER)
    .channels.get(config.Discord.LOG_CHANNEL)
  console.log(`Discord Ready!`)
  const readyEmbed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setDescription(`SATAROSS Systems Online and Ready!`)
    .addField(`Headless`, config.HEADLESS, true)
    .addField(`Redirect Wait Time`, `${config.REDIRECT_WAIT_TIME}ms`, true)
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
client.on('message', async msg => {
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
  }
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
        headless: config.HEADLESS
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
        // Write the link
        fs.appendFile(
          config.SCAM_LINK_LOG,
          currentTime + ' ' + page.url() + '\n',
          err => {
            if (err) throw err
          }
        )
        //

        console.log('posible scam site')
        await page.screenshot({
          path: `./data/${currentTime}.png`
        })

        let embed = new Discord.RichEmbed()
          .setAuthor(client.user.username, client.user.avatarURL)
          .setColor('#FF0000')
          .setTitle(`Possible Scam Site Found!`)
          .addField(`URL`, await page.url(), true)
          .setTimestamp()
          .setFooter(
            `SATAROSS by Puyodead1 and Puyodead1 Development`,
            client.user.avatarURL
          )
        logChannel.send(embed)
        logChannel.send({
          file: `./data/${currentTime}.png`
        })
      }
      await browser.close()
    }
  }
}

/**
 * This is for DEVELOPMENT ONLY
 */
process.on('uncaughtException', async err => {
  console.log('Houston, We have a problem! ' + err)

  let errorEmbed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setTitle(`Houston, We have a problem!`)
    .setDescription(`An error was cought! To be safe, SATAROSS will shutdown!`)
    .addField(`Error Message`, err.message, true)
    .setTimestamp()
    .setFooter(
      `SATAROSS by Puyodead1 and Puyodead1 Development`,
      client.user.avatarURL
    )
    .setThumbnail(
      'https://cdn.pixabay.com/photo/2015/06/09/16/12/error-803716__340.png'
    )

  await logChannel.send(errorEmbed)
  return process.exit(1)
})

// initDiscord()
initSATAROSS()
