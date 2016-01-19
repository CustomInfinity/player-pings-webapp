const $Games = new Mongo.Collection("games");


Meteor.methods({
    setGameName(gameId, newName) {
        $Games.update(gameId, {
            $set: { name: newName },
        }, { upsert: true });
    },

    deleteGame(gameId) {
        $Games.remove(gameId);
    },
});


if (Meteor.isServer) {
    Meteor.publish("games", function() {
        return $Games.find();
    });

    Meteor.publish("game", function(gameId) {
        return $Games.find({ _id: gameId });
    });
}


Games = {
    getAll() {
        return $Games.find().fetch();
    },

    get(gameId) {
        // Fetch the game document, or an empty object if no document exists.
        const game = $Games.findOne(gameId) || { _id: gameId };

        return game;
    },
};
