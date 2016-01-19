/**
 * A generic form to put at the end of a list of records,
 * which allows the user to create a new record by entering
 * an ID string.
 */
const AddRecordForm = React.createClass({
    propTypes: {
        onSubmit: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
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


/**
 * A generic list of links to records.
 * The records must have IDs, and may have names.
 */
RecordsList = React.createClass({
    propTypes: {
        records: React.PropTypes.arrayOf(React.PropTypes.shape({
            doc: React.PropTypes.shape({
                _id: React.PropTypes.string.isRequired,
                name: React.PropTypes.string,
            }),
            path: React.PropTypes.string.isRequired,
        }).isRequired).isRequired,
        addRecordPlaceholder: React.PropTypes.string,
        onAdd: React.PropTypes.func,
    },

    getName(record) {
        return record.doc.name || record.doc._id;
    },

    renderRecord(record) {
        return <li key={record.doc._id}>
            <a href={record.path}>
                {this.getName(record)}
            </a>
        </li>;
    },

    renderAddRecordForm() {
        if (this.props.onAdd) {
            return <li>
                <AddRecordForm
                    onSubmit={this.props.onAdd}
                    placeholder={this.props.addRecordPlaceholder}
                />
            </li>;
        } else {
            return null;
        }
    },

    render() {
        const records = ViewUtil.alphabeticalSort(
            this.props.records, this.getName);

        return <ul>
            {records.map(this.renderRecord)}
            {this.renderAddRecordForm()}
        </ul>;
    },
});
