LayoutController = React.createClass({
    propTypes: {
        content: React.PropTypes.node.isRequired,
    },

    render() {
        return <Layout
            content={this.props.content}
            gamesListPath={FlowRouter.path("games")}
            playersListPath={FlowRouter.path("players")}
        />;
    },
});
