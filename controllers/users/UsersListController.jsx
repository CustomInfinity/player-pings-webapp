UsersListController = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        return { users: Users.getAll() };
    },

    render() {
        return <UsersList
            users={this.data.users}
            getUserPath={(userId) => FlowRouter.path("user", { id: userId })}
        />;
    },
});
