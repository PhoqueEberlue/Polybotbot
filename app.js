// Node filesystem libs
const fs = require("node:fs");
const path = require("node:path");

// Importing discord.js classes
const {Client, Events, GatewayIntentBits, Collection} = require("discord.js")

// Importing the token
const {token} = require("./config.json");

const client = new Client({intents: [GatewayIntentBits.Guilds]});

// Our collection of commands
client.commands = new Collection();

// Getting every file in ./commands ending with .js
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

// Loading commands
for (const file of commandFiles) {

    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // Checks if command contains a data or execute property
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[Warning] The command at ${filePath} is missing a execute or data property.`);
    }
}

// Getting every file in ./events ending with .js
const eventsPath = path.join(__dirname, "events");
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

// Loading events
for (const file of eventsFiles) {

    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token)

