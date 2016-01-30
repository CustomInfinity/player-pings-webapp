const DiscordClient = Meteor.npmRequire("discord.io");


function pingDiscord(message) {
    console.log("Connecting to Discord.");
    const bot = new DiscordClient({
        email: Meteor.settings.discord.email,
        password: Meteor.settings.discord.password,
    });
    bot.connect();

    bot.on("ready", () => {
        console.log("Bot is ready! Let's send a message.", message);
        bot.sendMessage({
            to: Meteor.settings.discord.channelId,
            message: message,
        });
        bot.disconnect();
    });
}


Meteor.methods({
    requestPlay(gameId) {
        const game = Games.get(gameId);
        const players = Players.getFollowers(gameId).
            filter((p) => p.contacts.discord);

        if (players.length > 0) {
            const question = "Play " + (game.name || gameId) + "?";

            const discordUsernames = players.map((p) => p.contacts.discord);
            const atMentions = discordUsernames.map((u) => "<@" + u + ">");

            pingDiscord(question + " " + atMentions.join(" "));
        }

        return players;
    },
});
