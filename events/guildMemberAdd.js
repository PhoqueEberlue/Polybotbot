const {Events} = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        await member.user.send("Bonjour et bienvenue sur le serveur de Polybot !\n" +
            "N'hésites pas à mettre ton nom et prénom en pseudo de serveur afin que l'on te reconnaisse.\n" +
            "Pour toute question lié à Polybot, tourne toi vers les membres du bureau.");
    }
};