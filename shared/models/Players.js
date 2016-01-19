const $Players = new Mongo.Collection("players");


Meteor.methods({
    setPlayerName(playerId, newName) {
        $Players.update(playerId, {
            $set: { name: newName },
        }, { upsert: true });
    },

    followGame(playerId, gameId) {
        $Players.update(playerId, {
            $addToSet: { followedGameIds: gameId },
        }, { upsert: true });
    },

    unfollowGame(playerId, gameId) {
        $Players.update(playerId, {
            $pullAll: { followedGameIds: [gameId] },
        });
    },

    deletePlayer(playerId) {
        $Players.remove(playerId);
    },
});


if (Meteor.isServer) {
    Meteor.publish("players", function() {
        return $Players.find();
    });

    Meteor.publish("player", function(playerId) {
        return $Players.find({ _id: playerId });
    });
}


Players = {
    getAll() {
        return $Players.find().fetch();
    },

    get(playerId) {
        // Fetch the player document, or an empty object if no document exists.
        const player = $Players.findOne(playerId) || { _id: playerId };

        // If any fields are not yet set, use their default values.
        player.followedGameIds = player.followedGameIds || [];

        return player;
    },
};
