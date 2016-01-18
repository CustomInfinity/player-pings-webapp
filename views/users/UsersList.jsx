UsersList = React.createClass({
    propTypes: {
        users: React.PropTypes.arrayOf(React.PropTypes.shape({
            _id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string,
        }).isRequired).isRequired,
        getUserPath: React.PropTypes.func.isRequired,
    },

    getInitialState() {
        return { newUserId: uuid.v4() };
    },

    updateNewUserId() {
        // If the user ctrl-clicks "Add user" in order to get a bunch of new
        // user forms, they should actually get _different_ new user forms.
        // So, when the link is clicked, update the new user ID.
        this.setState({ newUserId: uuid.v4() });
    },

    renderUserLink(user) {
        return <li key={user._id}>
            <a href={this.props.getUserPath(user._id)}>
                {user.name || user._id}
            </a>
        </li>;
    },

    render() {
        return <div>
            <ul>
                {this.props.users.map(this.renderUserLink)}
                <li>
                    <a
                        href={this.props.getUserPath(this.state.newUserId)}
                        onClick={this.updateNewUserId}
                    >
                        Add user
                    </a>
                </li>
            </ul>
        </div>;
    },
});
