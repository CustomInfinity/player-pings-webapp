UserSettingsForm = React.createClass({
    propTypes: {
        user: React.PropTypes.shape({
            _id: React.PropTypes.string.isRequired,
            followedGameIds: React.PropTypes.arrayOf(
                React.PropTypes.string.isRequired
            ).isRequired,
        }).isRequired,
        allGames: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
        }).isRequired).isRequired,
        onAddGame: React.PropTypes.func.isRequired,
        onRemoveGame: React.PropTypes.func.isRequired,
        onChangeName: React.PropTypes.func.isRequired,
        onDeleteUser: React.PropTypes.func.isRequired,
    },

    changeName(e) {
        this.props.onChangeName(e.target.value);
    },

    toggleFollowingGame(id, wasFollowed) {
        if (wasFollowed) {
            this.props.onRemoveGame(id);
        } else {
            this.props.onAddGame(id);
        }
    },

    confirmDeleteUser() {
        if (confirm("Are you sure you want to delete this user?")) {
            this.props.onDeleteUser();
        }
    },

    renderFollowingGameToggles() {
        return this.props.allGames.map((game) => {
            const followed =
                this.props.user.followedGameIds.indexOf(game.id) >= 0;
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
                        value={this.props.user.name}
                        onChange={this.changeName}
                    />
                </label>
            </div>
            <ul>{this.renderFollowingGameToggles()}</ul>
            <button onClick={this.confirmDeleteUser}>
                Delete user
            </button>
        </div>;
    },
});
