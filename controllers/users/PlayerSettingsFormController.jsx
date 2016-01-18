PlayerSettingsFormController = React.createClass({
    propTypes: {
        playerId: React.PropTypes.string.isRequired,
    },

    mixins: [ReactMeteorData],

    getMeteorData() {
        return { player: Players.get(this.props.playerId) };
    },

    addGame(id) {
        Players.addGame(this.props.playerId, id);
    },

    removeGame(id) {
        Players.removeGame(this.props.playerId, id);
    },

    changeName(newName) {
        Players.setName(this.props.playerId, newName);
    },

    deletePlayer() {
        Players.delete(this.props.playerId);
        FlowRouter.go("players");
    },

    render() {
        // During the initial render, this.data isn't set yet.
        // Don't render PlayerSettingsForm until we've gotten our Meteor data.
        return this.data.player && <PlayerSettingsForm
            player={this.data.player}
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
            onDeletePlayer={this.deletePlayer}
        />;
    },
});
