Meteor.methods({
    requestPlay(gameId) {
        const players = Players.getFollowers(gameId);
        console.log("request play", gameId, players);
        return players;
    },
});
