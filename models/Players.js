const PlayersCollection = new Mongo.Collection("players");

/**
 * A model that wraps the database's players collection.
 * All possible players implicitly exist, despite not being persisted to the
 * database. If we don't find the player in the database, we return a player with
 * default values. Then, when we attempt to update the player, we perform an
 * upsert to create the document if it didn't already exist.
 */
Players = {
    getAll() {
        return PlayersCollection.find().fetch();
    },

    get(playerId) {
        // Fetch the player document, or an empty object if no document exists.
        const player = PlayersCollection.findOne(playerId) || { _id: playerId };

        // If any fields are not yet set, use their default values.
        player.followedGameIds = player.followedGameIds || [];

        return player;
    },

    setName(playerId, newName) {
        PlayersCollection.update(playerId, {
            $set: { name: newName },
        }, { upsert: true });
    },

    addGame(playerId, gameId) {
        PlayersCollection.update(playerId, {
            $addToSet: { followedGameIds: gameId },
        }, { upsert: true });
    },

    removeGame(playerId, gameId) {
        PlayersCollection.update(playerId, {
            $pullAll: { followedGameIds: [gameId] },
        });
    },

    delete(playerId) {
        PlayersCollection.remove(playerId);
    },
};
