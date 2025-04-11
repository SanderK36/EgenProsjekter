function rest() {
    let char = model.data.selectedCharacter;
    char.hp += 20;
    addToLog(char.name + " rests and recovers 20 HP. Current HP: " + char.hp);
    updateView();
}

function explore() {
    const currentLocation = model.data.currentLocation;
    if (currentLocation === "Tavern") {
        addToLog("The Tavern is a safe haven—no orcs here to bother you!");
        updateView();
        return;
    }
    if (Math.random() < 0.5) {
        const randomIndex = Math.floor(Math.random() * model.data.orcImages.length);
        model.data.currentEnemy = {
            hp: 150,
            image: model.data.orcImages[randomIndex]
        };
        addToLog("An orc appears! Prepare for battle!");
    } else {
        addToLog(model.data.selectedCharacter.name + " explores and finds nothing...");
    }
    updateView();
}