const Discord = require('discord.js')

exports.run = async (client, msg, args) => {
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
exports.help = {
  name: 'quit',
  category: 'Bot',
  description: 'Shutdown',
  usage: 'quit'
}
