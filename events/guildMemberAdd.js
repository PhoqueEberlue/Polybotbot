const {Events} = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        await member.user.send("Bonjour et bienvenue sur le serveur de Polybot !");
    }
};