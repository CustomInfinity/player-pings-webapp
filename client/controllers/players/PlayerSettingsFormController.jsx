PlayerSettingsFormController = React.createClass({
    propTypes: {
        playerId: React.PropTypes.string.isRequired,
    },

    mixins: [ReactMeteorData],

    getMeteorData() {
        const handle = Meteor.subscribe("player", this.props.playerId);
        return { player: handle.ready() && Players.get(this.props.playerId) };
    },

    changeName(newName) {
        Meteor.call("setPlayerName", this.props.playerId, newName);
    },

    changeContact(serviceId, serviceUserId) {
        Meteor.call("setPlayerContact", this.props.playerId,
                    serviceId, serviceUserId);
    },

    followGame(id) {
        Meteor.call("followGame", this.props.playerId, id);
    },

    unfollowGame(id) {
        Meteor.call("unfollowGame", this.props.playerId, id);
    },

    deletePlayer() {
        Meteor.call("deletePlayer", this.props.playerId);
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
            onChangeName={this.changeName}
            onChangeContact={this.changeContact}
            onFollowGame={this.followGame}
            onUnfollowGame={this.unfollowGame}
            onDelete={this.deletePlayer}
        />;
    },
});
