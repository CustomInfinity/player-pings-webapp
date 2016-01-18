PlayersList = React.createClass({
    propTypes: {
        players: React.PropTypes.arrayOf(React.PropTypes.shape({
            _id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string,
        }).isRequired).isRequired,
        getPlayerPath: React.PropTypes.func.isRequired,
    },

    getInitialState() {
        return { newPlayerId: uuid.v4() };
    },

    updateNewPlayerId() {
        // If the player ctrl-clicks "Add player" in order to get a bunch of new
        // player forms, they should actually get _different_ new player forms.
        // So, when the link is clicked, update the new player ID.
        this.setState({ newPlayerId: uuid.v4() });
    },

    renderPlayerLink(player) {
        return <li key={player._id}>
            <a href={this.props.getPlayerPath(player._id)}>
                {player.name || player._id}
            </a>
        </li>;
    },

    render() {
        return <div>
            <ul>
                {this.props.players.map(this.renderPlayerLink)}
                <li>
                    <a
                        href={this.props.getPlayerPath(this.state.newPlayerId)}
                        onClick={this.updateNewPlayerId}
                    >
                        Add player
                    </a>
                </li>
            </ul>
        </div>;
    },
});
