// Importing discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js")

// Importing the token
const { token } = require("./config.json");

const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, c => {
    console.log(`[${Date()}][Running] logged as ${c.user.tag}`)
});

client.once(Events.GuildMemberAdd, async c => {
    await c.user.send("bonsoir");
})

client.login(token)

