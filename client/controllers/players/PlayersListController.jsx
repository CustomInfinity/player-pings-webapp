PlayersListController = React.createClass({
    render() {
        return <RecordsListController
            recordType="player"
            getAll={Players.getAll}
            view={PlayersList}
        />;
    },
});
