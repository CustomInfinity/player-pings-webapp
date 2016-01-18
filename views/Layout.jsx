Layout = React.createClass({
    propTypes: {
        content: React.PropTypes.node.isRequired,
        usersListPath: React.PropTypes.string.isRequired,
    },

    render() {
        return <div>
            <header className="layout-header">
                <h1>Player Pings</h1>
                <nav>
                    <a href={this.props.usersListPath}>All Users</a>
                </nav>
            </header>
            {this.props.content}
        </div>;
    },
});
