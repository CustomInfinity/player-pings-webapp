GamesList = React.createClass({
    propTypes: {
        games: React.PropTypes.arrayOf(React.PropTypes.shape({
            doc: React.PropTypes.shape({
                _id: React.PropTypes.string.isRequired,
                name: React.PropTypes.string,
            }),
            path: React.PropTypes.string.isRequired,
        }).isRequired).isRequired,
        onAdd: React.PropTypes.func.isRequired,
        onRequestPlay: React.PropTypes.func.isRequired,
    },

    render() {
        const records = this.props.games.map((game) => ({
            doc: game.doc,
            path: game.path,
            content: <button
                onClick={() => this.props.onRequestPlay(game.doc._id)}
            >
                Play?
            </button>,
        }));

        return <div>
            <p>These are the games we like to play!</p>
            <RecordsList
                records={records}
                addRecordPlaceholder="new-game-slug"
                onAdd={this.props.onAdd}
            />
        </div>;
    },
});
