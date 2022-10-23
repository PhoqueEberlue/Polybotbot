const { Events } = require("discord.js");

// Event triggered when the bot is ready
module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`[${Date()}][Running] logged as ${client.user.tag}`);
    }
};