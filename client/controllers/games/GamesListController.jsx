GamesListController = React.createClass({
    requestPlay(gameId) {
        const players = Meteor.call("requestPlay", gameId, (e, players) => {
            if (e) {
                alert("Error requesting play :(");
                console.error(e);
            } else if (players.length === 0) {
                alert("Nobody is following this game :/");
            } else {
                const playersString = players.map((p) => p.name).join(", ");
                alert("Requested to play with: " + playersString);
            }
        });
    },

    render() {
        return <RecordsListController
            recordType="game"
            getAll={Games.getAll}
            view={GamesList}
            viewProps={{
                onRequestPlay: this.requestPlay,
            }}
        />;
    },
});
