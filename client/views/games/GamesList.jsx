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
    },

    render() {
        return <div>
            <p>These are the games we like to play!</p>
            <RecordsList
                records={this.props.games}
                addRecordPlaceholder="new-game-slug"
                onAdd={this.props.onAdd}
            />
        </div>;
    },
});
