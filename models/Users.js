const UsersCollection = new Mongo.Collection("users");

/**
 * A model that wraps the database's users collection.
 * All possible users implicitly exist, despite not being persisted to the
 * database. If we don't find the user in the database, we return a user with
 * default values. Then, when we attempt to update the user, we perform an
 * upsert to create the document if it didn't already exist.
 */
Users = {
    getAll() {
        return UsersCollection.find().fetch();
    },

    get(userId) {
        // Fetch the user document, or an empty object if no document exists.
        const user = UsersCollection.findOne(userId) || { _id: userId };

        // If any fields are not yet set, use their default values.
        user.followedGameIds = user.followedGameIds || [];

        return user;
    },

    setName(userId, newName) {
        UsersCollection.update(userId, {
            $set: { name: newName },
        }, { upsert: true });
    },

    addGame(userId, gameId) {
        UsersCollection.update(userId, {
            $addToSet: { followedGameIds: gameId },
        }, { upsert: true });
    },

    removeGame(userId, gameId) {
        UsersCollection.update(userId, {
            $pullAll: { followedGameIds: [gameId] },
        });
    },

    delete(userId) {
        UsersCollection.remove(userId);
    },
};
