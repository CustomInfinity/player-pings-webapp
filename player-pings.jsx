FlowRouter.route('/users', {
    name: "users",
    action() {
        ReactLayout.render(Layout, { content: <UsersController /> });
    },
});


FlowRouter.route('/users/:discordUsername', {
    name: "user",
    action(params) {
        ReactLayout.render(Layout, {
            content: <UsersController
                discordUsername={params.discordUsername}
            />,
        });
    },
});
