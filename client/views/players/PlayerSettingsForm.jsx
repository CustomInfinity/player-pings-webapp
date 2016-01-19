PlayerSettingsForm = React.createClass({
    propTypes: {
        player: React.PropTypes.shape({
            _id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string,
            followedGameIds: React.PropTypes.arrayOf(
                React.PropTypes.string.isRequired
            ).isRequired,
        }).isRequired,
        allGames: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
        }).isRequired).isRequired,
        onFollowGame: React.PropTypes.func.isRequired,
        onUnfollowGame: React.PropTypes.func.isRequired,
        onChangeName: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired,
    },

    toggleFollowingGame(id, wasFollowed) {
        if (wasFollowed) {
            this.props.onUnfollowGame(id);
        } else {
            this.props.onFollowGame(id);
        }
    },

    renderFollowingGameToggles() {
        return this.props.allGames.map((game) => {
            const followed =
                this.props.player.followedGameIds.indexOf(game.id) >= 0;
            return <li key={game.id}>
                <label>
                    <input
                        type="checkbox"
                        checked={followed}
                        onChange={() =>
                            this.toggleFollowingGame(game.id, followed)
                        }
                    />
                    {game.name}
                </label>
            </li>
        });
    },

    render() {
        return <RecordSettingsForm
            recordType="player"
            record={this.props.player}
            content={this.renderFollowingGameToggles()}
            onChangeName={this.props.onChangeName}
            onDelete={this.props.onDelete}
        />;
    },
});
