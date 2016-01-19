function renderPage(content) {
    ReactLayout.render(LayoutController, { content });
}


FlowRouter.route("/", {
    name: "games",
    action() {
        renderPage(<GamesListController />);
    },
});


FlowRouter.route("/games/:id", {
    name: "game",
    action(params) {
        renderPage(<GameSettingsFormController gameId={params.id} />);
    },
});


FlowRouter.route("/players", {
    name: "players",
    action() {
        renderPage(<PlayersListController />);
    },
});


FlowRouter.route("/players/:id", {
    name: "player",
    action(params) {
        renderPage(<PlayerSettingsFormController playerId={params.id} />);
    },
});
