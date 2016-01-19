PlayerSettingsFormController = React.createClass({
    propTypes: {
        playerId: React.PropTypes.string.isRequired,
    },

    mixins: [ReactMeteorData],

    getMeteorData() {
        Meteor.subscribe("games");
        const playerSub = Meteor.subscribe("player", this.props.playerId);
        return {
            games: Games.getAll(),
            player: playerSub.ready() && Players.get(this.props.playerId)
        };
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
            allGames={this.data.games}
            onChangeName={this.changeName}
            onChangeContact={this.changeContact}
            onFollowGame={this.followGame}
            onUnfollowGame={this.unfollowGame}
            onDelete={this.deletePlayer}
        />;
    },
});
