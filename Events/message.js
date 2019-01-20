const config = require('../config.json')

module.exports = async (client, message) => {
  if (message.author.bot) return

  if (message.content.startsWith(config.DISCORD.PREFIX)) {
    // Here we separate our 'command' name, and our 'arguments' for the command.
    // e.g. if we have the message '+say Is this the real life?' , we'll get the following:
    // command = say
    // args = ['Is', 'this', 'the', 'real', 'life?']
    const args = message.content
      .slice(config.DISCORD.PREFIX.length)
      .trim()
      .split(/ +/g)
    const command = args.shift().toLowerCase()
    // Check whether the command, or alias, exist in the collections defined
    // in app.js.
    const cmd = client.commands.get(command)
    // using this const varName = thing OR otherthign; is a pretty efficient
    // and clean way to grab one of 2 values!
    if (!cmd) return

    // If the command exists, **AND** the user has permission, run it.
    console.log(
      `[CMD] ${message.author.username} (${message.author.id}) ran command ${
        cmd.help.name
      }`
    )
    cmd.run(client, message, args)
  }
}
