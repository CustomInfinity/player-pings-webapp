/**
 * A generic form to put at the end of a list of documents,
 * which allows the user to create a new document by entering
 * an ID string.
 */
const AddDocumentForm = React.createClass({
    propTypes: {
        onSubmit: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string.isRequired,
    },

    mixins: [React.addons.LinkedStateMixin],

    getInitialState() {
        return { id: "" };
    },

    submit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.id);
    },

    render() {
        return <form onSubmit={this.submit}>
            <input
                type="text"
                placeholder={this.props.placeholder}
                valueLink={this.linkState("id")}
            />
            <button>Add</button>
        </form>;
    },
});


PlayersList = React.createClass({
    propTypes: {
        players: React.PropTypes.arrayOf(React.PropTypes.shape({
            _id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string,
        }).isRequired).isRequired,
        getPlayerPath: React.PropTypes.func.isRequired,
        onAddPlayer: React.PropTypes.func.isRequired,
    },

    sortPlayers() {
        return ViewUtil.alphabeticalSort(this.props.players,
                                         this.renderPlayerName);
    },

    renderPlayerName(player) {
        return player.name || player._id;
    },

    renderPlayerLink(player) {
        return <li key={player._id}>
            <a href={this.props.getPlayerPath(player._id)}>
                {this.renderPlayerName(player)}
            </a>
        </li>;
    },

    render() {
        return <div>
            <ul>
                {this.sortPlayers().map(this.renderPlayerLink)}
                <li>
                    <AddDocumentForm
                        onSubmit={this.props.onAddPlayer}
                        placeholder="new-player-slug"
                    />
                </li>
            </ul>
        </div>;
    },
});
