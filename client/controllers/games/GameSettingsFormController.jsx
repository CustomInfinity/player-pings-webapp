GameSettingsFormController = React.createClass({
    propTypes: {
        gameId: React.PropTypes.string.isRequired,
    },

    mixins: [ReactMeteorData],

    getMeteorData() {
        Meteor.subscribe("game", this.props.gameId);
        return { game: Games.get(this.props.gameId) };
    },

    changeName(newName) {
        Meteor.call("setGameName", this.props.gameId, newName);
    },

    deleteGame() {
        Meteor.call("deleteGame", this.props.gameId);
        FlowRouter.go("games");
    },

    render() {
        return this.data.game && <GameSettingsForm
            game={this.data.game}
            onChangeName={this.changeName}
            onDelete={this.deleteGame}
        />;
    },
});
