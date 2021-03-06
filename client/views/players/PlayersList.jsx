PlayersList = React.createClass({
    propTypes: {
        players: React.PropTypes.arrayOf(React.PropTypes.shape({
            doc: React.PropTypes.shape({
                _id: React.PropTypes.string.isRequired,
                name: React.PropTypes.string,
            }).isRequired,
            path: React.PropTypes.string.isRequired,
        }).isRequired).isRequired,
        onAdd: React.PropTypes.func.isRequired,
    },

    render() {
        return <div>
            <p>These are the people we like to play games with!</p>
            <RecordsList
                records={this.props.players}
                addRecordPlaceholder="new-player-slug"
                onAdd={this.props.onAdd}
            />
        </div>;
    },
});
