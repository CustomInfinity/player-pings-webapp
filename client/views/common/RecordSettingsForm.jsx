RecordSettingsForm = React.createClass({
    propTypes: {
        recordType: React.PropTypes.string.isRequired,
        record: React.PropTypes.shape({
            _id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string,
        }).isRequired,
        content: React.PropTypes.node,
        onChangeName: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired,
    },

    changeName(e) {
        this.props.onChangeName(e.target.value);
    },

    confirmDelete() {
        const message = "Are you sure you want to delete this " +
                        this.props.recordType + "?";

        if (confirm(message)) {
            this.props.onDelete();
        }
    },

    render() {
        const record = this.props.record;

        return <div>
            <div>
                <label>
                    Slug:
                    <input
                        type="text"
                        value={record._id}
                        disabled
                    />
                </label>
                <br />
                <label>
                    Name:
                    <input
                        type="text"
                        value={record.name}
                        onChange={this.changeName}
                        autoFocus={!record.name}
                    />
                </label>
            </div>
            {this.props.content}
            <button onClick={this.confirmDelete}>
                Delete {this.props.recordType}
            </button>
        </div>;
    },
});
