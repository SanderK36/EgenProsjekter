function selectCharacter(id) {
    model.app.currentCharacterId = id;
    updateView();
}


function resetCharacter() {
    model.app.currentCharacterId = null;
    updateView();
}