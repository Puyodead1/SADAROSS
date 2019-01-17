const puppeteer = require('puppeteer');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var links = ['http://ggmail.com',
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
  'http://googwe.com',
  'http://gookle.com',
  'http://goolle.com',
  'http://goonle.com',
  'http://gooqle.com',
  'http://gooxle.com',
  'http://gooyle.com',
  'http://gopgle.com',
  'http://gpogle.com',
  'http://guogle.com',
  'http://gyogle.com',
  'http://youtubd.com',
  'http://youtubs.com',
  'http://youtubu.com'
];
var counter = 0;
//var user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36'

async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getDateTime() {

  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  return year + "-" + month + "-" + day + "-" + hour + "-" + min + "-" + sec;

}

(async () => {
  while (true) {
    for (let storyLink of links) {
      const browser = await puppeteer.launch({
        headless: false
      });
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko');
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      var currentTime = getDateTime();
      await page.goto(storyLink);

      //Wait for page to fully load/redirect
      await timeout(15000);
      //

      //Write the link
      fs.appendFile('alllinks.log', currentTime + ' ' + page.url() + "\n", (err) => {
        if (err) throw err;
      });
      //

      const found = /virus|infected|pornographic|spyware|riskware|blocked|locked|toll/.test(await page.content());
      console.log(found);
      if (found) {
        console.log('posible scam site');
        await page.screenshot({
          path: './data/' + currentTime + '.png'
        });
        client.channels.get("id of discord channel").send("Possible Scam Site Found!", {
          file: "./data/" + currentTime + ".png"
        });
      }
      counter++;
      await browser.close();
    };
  }
})();

client.login('');
