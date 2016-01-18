UserSettingsForm = React.createClass({
    propTypes: {
        discordUsername: React.PropTypes.string.isRequired,
        followedGameIds: React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired
        ).isRequired,
        allGames: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
        }).isRequired).isRequired,
        onAddGame: React.PropTypes.func.isRequired,
        onRemoveGame: React.PropTypes.func.isRequired,
    },

    toggleFollowingGame(id, wasFollowed) {
        if (wasFollowed) {
            this.props.onRemoveGame(id);
        } else {
            this.props.onAddGame(id);
        }
    },

    renderFollowingGameToggles() {
        return this.props.allGames.map((game) => {
            const followed = this.props.followedGameIds.indexOf(game.id) >= 0;
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
            <p>
                Hello, {this.props.discordUsername}!
                What games would you like to play?
            </p>
            <ul>{this.renderFollowingGameToggles()}</ul>
        </div>;
    },
});
