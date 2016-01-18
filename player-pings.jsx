function renderPage(content) {
    ReactLayout.render(LayoutController, { content });
}


FlowRouter.route('/users', {
    name: "users",
    action() {
        renderPage(<UsersListController />);
    },
});


FlowRouter.route('/users/:id', {
    name: "user",
    action(params) {
        renderPage(<UserSettingsFormController userId={params.id} />);
    },
});
