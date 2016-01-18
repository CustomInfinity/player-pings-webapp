function renderPage(content) {
    ReactLayout.render(LayoutController, { content });
}


FlowRouter.route('/players', {
    name: "players",
    action() {
        renderPage(<PlayersListController />);
    },
});


FlowRouter.route('/players/:id', {
    name: "player",
    action(params) {
        renderPage(<PlayerSettingsFormController playerId={params.id} />);
    },
});
