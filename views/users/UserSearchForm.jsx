UserSearchForm = React.createClass({
    propTypes: {
        onSearch: React.PropTypes.func.isRequired,
        initialDiscordUsername: React.PropTypes.string,
    },
    getInitialState() {
        return { discordUsername: null };
    },
    getDiscordUsername() {
        if (this.state.discordUsername === null) {
            return this.props.initialDiscordUsername;
        } else {
            return this.state.discordUsername;
        }
    },
    handleChange(e) {
        this.setState({ discordUsername: e.target.value });
    },
    search(e) {
        e.preventDefault();
        this.props.onSearch(this.getDiscordUsername());
    },
    render() {
        return <form onSubmit={this.search}>
            Enter your Discord username:
            <input
                type="text"
                value={this.getDiscordUsername()}
                onChange={this.handleChange}
                placeholder="matchu"
            />
            <button disabled={!this.getDiscordUsername()}>Search</button>
        </form>;
    },
});
