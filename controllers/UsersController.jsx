UsersController = React.createClass({
    propTypes: {
        discordUsername: React.PropTypes.string,
    },

    mixins: [ReactMeteorData],

    getMeteorData() {
        const discordUsername = this.props.discordUsername;
        return { user: discordUsername ? Users.get(discordUsername) : null };
    },

    handleSearch(newDiscordUsername) {
        FlowRouter.go("user", { discordUsername: newDiscordUsername });
    },

    addGame(id) {
        Users.addGame(this.props.discordUsername, id);
    },

    removeGame(id) {
        Users.removeGame(this.props.discordUsername, id);
    },

    render() {
        return <div>
            <UserSearchForm
                onSearch={this.handleSearch}
                initialDiscordUsername={this.props.discordUsername}
            />
            {this.props.discordUsername && <UserSettingsForm
                discordUsername={this.props.discordUsername}
                allGames={[  /* TODO: should obvs be in the database */
                    { id: "ffxiv", name: "Final Fantasy XIV: A Realm Reborn" },
                    { id: "hots", name: "Heroes of the Storm" },
                    { id: "rocket-league", name: "Rocket League" },
                    { id: "splatoon", name: "Splatoon" },
                    { id: "smash4", name: "Super Smash Bros: 3DS and Wii U" },
                ]}
                followedGameIds={this.data.user.followedGameIds}
                onAddGame={this.addGame}
                onRemoveGame={this.removeGame}
            />}
        </div>;
    },
});
