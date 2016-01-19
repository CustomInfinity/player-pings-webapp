PlayersListController = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        Meteor.subscribe("players");
        return { players: Players.getAll() };
    },

    getPlayerPath(playerId) {
        return FlowRouter.path("player", { id: playerId });
    },

    goToPlayer(playerId) {
        return FlowRouter.go("player", { id: playerId });
    },

    render() {
        return <PlayersList
            players={this.data.players}
            getPlayerPath={this.getPlayerPath}
            onAddPlayer={this.goToPlayer}
        />;
    },
});
