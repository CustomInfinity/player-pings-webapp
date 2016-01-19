PlayerSettingsForm = React.createClass({
    propTypes: {
        player: React.PropTypes.shape({
            _id: React.PropTypes.string.isRequired,
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
        onDeletePlayer: React.PropTypes.func.isRequired,
    },

    changeName(e) {
        this.props.onChangeName(e.target.value);
    },

    toggleFollowingGame(id, wasFollowed) {
        if (wasFollowed) {
            this.props.onUnfollowGame(id);
        } else {
            this.props.onFollowGame(id);
        }
    },

    confirmDeletePlayer() {
        if (confirm("Are you sure you want to delete this player?")) {
            this.props.onDeletePlayer();
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
        return <div>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        value={this.props.player.name}
                        onChange={this.changeName}
                    />
                </label>
            </div>
            <ul>{this.renderFollowingGameToggles()}</ul>
            <button onClick={this.confirmDeletePlayer}>
                Delete player
            </button>
        </div>;
    },
});
