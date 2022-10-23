const {Events} = require("discord.js");

// Event to handle interactions such as commands
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
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
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
};