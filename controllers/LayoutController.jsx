LayoutController = React.createClass({
    propTypes: {
        content: React.PropTypes.node.isRequired,
    },
    render() {
        return <Layout
            content={this.props.content}
            usersListPath={FlowRouter.path("users")}
        />;
    },
});
