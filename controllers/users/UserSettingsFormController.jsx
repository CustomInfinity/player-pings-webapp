UserSettingsFormController = React.createClass({
    propTypes: {
        userId: React.PropTypes.string.isRequired,
    },

    mixins: [ReactMeteorData],

    getMeteorData() {
        return { user: Users.get(this.props.userId) };
    },

    addGame(id) {
        Users.addGame(this.props.userId, id);
    },

    removeGame(id) {
        Users.removeGame(this.props.userId, id);
    },

    changeName(newName) {
        Users.setName(this.props.userId, newName);
    },

    deleteUser() {
        Users.delete(this.props.userId);
        FlowRouter.go("users");
    },

    render() {
        // During the initial render, this.data isn't set yet.
        // Don't render UserSettingsForm until we've gotten our Meteor data.
        return this.data.user && <UserSettingsForm
            user={this.data.user}
            allGames={[  /* TODO: should obvs be in the database */
                { id: "ffxiv", name: "Final Fantasy XIV: A Realm Reborn" },
                { id: "hots", name: "Heroes of the Storm" },
                { id: "rocket-league", name: "Rocket League" },
                { id: "splatoon", name: "Splatoon" },
                { id: "smash4", name: "Super Smash Bros: 3DS and Wii U" },
            ]}
            onAddGame={this.addGame}
            onRemoveGame={this.removeGame}
            onChangeName={this.changeName}
            onDeleteUser={this.deleteUser}
        />;
    },
});
