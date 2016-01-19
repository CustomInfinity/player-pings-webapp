RecordsListController = React.createClass({
    propTypes: {
        recordType: React.PropTypes.string.isRequired,
        getAll: React.PropTypes.func.isRequired,
        view: React.PropTypes.any.isRequired,  // a component class
        viewProps: React.PropTypes.any,
    },

    mixins: [ReactMeteorData],

    getMeteorData() {
        Meteor.subscribe(this.props.recordType + "s");
        return { records: this.props.getAll() };
    },

    goToRecord(recordId) {
        return FlowRouter.go(this.props.recordType, { id: recordId });
    },

    render() {
        const records = this.data.records.map((record) => ({
            doc: record,
            path: FlowRouter.path(this.props.recordType, { id: record._id }),
        }));

        const props = { onAdd: this.goToRecord };
        props[this.props.recordType + "s"] = records;

        return <this.props.view {...props} {...this.props.viewProps} />;
    },
});
