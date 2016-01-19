GamesListController = React.createClass({
    render() {
        return <RecordsListController
            recordType="game"
            getAll={Games.getAll}
            view={GamesList}
        />;
    },
});
