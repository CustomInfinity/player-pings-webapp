LayoutController = React.createClass({
    propTypes: {
        content: React.PropTypes.node.isRequired,
    },

    render() {
        return <Layout
            content={this.props.content}
            playersListPath={FlowRouter.path("players")}
        />;
    },
});
