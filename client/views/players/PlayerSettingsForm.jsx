PlayerSettingsForm = React.createClass({
    propTypes: {
        player: React.PropTypes.shape({
            _id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string,
            contacts: React.PropTypes.shape({
                discord: React.PropTypes.string,
            }).isRequired,
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
        onChangeContact: React.PropTypes.func.isRequired,
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

    handleChangeDiscordContact(e) {
        this.props.onChangeContact("discord", e.target.value);
    },

    renderContent() {
        return <div>
            <fieldset>
                <legend>Contact information</legend>
                <ul>
                    <li>
                        <label>
                            Discord username:
                            <input
                                type="text"
                                value={this.props.player.contacts.discord}
                                onChange={this.handleChangeDiscordContact}
                            />
                        </label>
                    </li>
                </ul>
            </fieldset>
            <fieldset>
                <legend>Games</legend>
                {this.renderFollowingGameToggles()}
            </fieldset>
        </div>;
    },

    render() {
        return <RecordSettingsForm
            recordType="player"
            record={this.props.player}
            content={this.renderContent()}
            onChangeName={this.props.onChangeName}
            onDelete={this.props.onDelete}
        />;
    },
});
