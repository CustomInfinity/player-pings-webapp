const $Players = new Mongo.Collection("players");


Meteor.methods({
    setPlayerName(playerId, newName) {
        $Players.update(playerId, {
            $set: { name: newName },
        }, { upsert: true });
    },

    setPlayerContact(playerId, serviceId, serviceUserId) {
        check(serviceId, Match.OneOf("discord"));

        const setter = {};
        setter["contacts." + serviceId] = serviceUserId;

        $Players.update(playerId, {
            $set: setter
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


function buildPlayer(doc) {
    return {
        _id: doc._id,
        name: doc.name || "",
        followedGameIds: doc.followedGameIds || [],
        contacts: doc.contacts || {},
    };
}


Players = {
    getAll() {
        return $Players.find().fetch();
    },

    get(playerId) {
        // Fetch the player document, or an empty object if no document exists.
        const doc = $Players.findOne(playerId) || { _id: playerId };
        return buildPlayer(doc);
    },

    getFollowers(gameId) {
        const docs = $Players.find({ followedGameIds: gameId });
        return docs.map(buildPlayer);
    },
};
