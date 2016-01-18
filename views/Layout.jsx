Layout = React.createClass({
    propTypes: {
        content: React.PropTypes.node.isRequired,
    },

    render() {
        return <div>
            <h1>Player Pings</h1>
            {this.props.content}
        </div>;
    },
});
