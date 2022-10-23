// Node filesystem libs
const fs = require("node:fs");
const path = require("node:path");

// Importing discord.js classes
const { Client, Events, GatewayIntentBits, Collection} = require("discord.js")

// Importing the token
const { token } = require("./config.json");

const client = new Client({intents: [GatewayIntentBits.Guilds]});

// Our collection of commands
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');

// Gets every file in ./commands ending with .js
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

// Event to handle interactions
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    // Gets the command
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        // Execute the command
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.once(Events.ClientReady, c => {
    console.log(`[${Date()}][Running] logged as ${c.user.tag}`)
});

client.once(Events.GuildMemberAdd, async c => {
    await c.user.send("bonsoir");
})

client.login(token)

