function rest() {
    let char = model.data.selectedCharacter;
    char.hp += 20;
    addToLog(char.name + " rests and recovers 20 HP. Current HP: " + char.hp);
    updateView();
}