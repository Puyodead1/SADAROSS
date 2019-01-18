module.exports = client => {
  /*
    COMMAND LOAD AND UNLOAD

    To simplify the loading and unloading of commands from multiple locations
    including the index.js load loop, and the reload function, these 2 ensure
    that unloading happens in a consistent manner across the board.
    */
  client.loadCommand = commandName => {
    try {
      const props = require(`../commands/${commandName}`)
      console.log(`Loading Command: ${props.help.name}.`)
      if (props.init) {
        props.init(client)
      }
      client.commands.set(props.help.name, props)
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name)
      })
      return false
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`
    }
  }

  client.unloadCommand = async commandName => {
    let command
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName)
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName))
    }
    if (!command) {
      return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`
    }

    if (command.shutdown) {
      await command.shutdown(client)
    }
    delete require.cache[require.resolve(`../commands/${commandName}.js`)]
    return false
  }
}
