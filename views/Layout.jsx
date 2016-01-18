Layout = React.createClass({
    propTypes: {
        content: React.PropTypes.node.isRequired,
        playersListPath: React.PropTypes.string.isRequired,
    },

    render() {
        return <div>
            <header className="layout-header">
                <h1>Player Pings</h1>
                <nav>
                    <a href={this.props.playersListPath}>All Players</a>
                </nav>
            </header>
            {this.props.content}
        </div>;
    },
});
