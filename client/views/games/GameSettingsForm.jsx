GameSettingsForm = React.createClass({
    propTypes: {
        game: React.PropTypes.shape({
            _id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string,
        }).isRequired,
        onChangeName: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired,
    },

    render() {
        return <RecordSettingsForm
            recordType="game"
            record={this.props.game}
            onChangeName={this.props.onChangeName}
            onDelete={this.props.onDelete}
        />;
    },
});
