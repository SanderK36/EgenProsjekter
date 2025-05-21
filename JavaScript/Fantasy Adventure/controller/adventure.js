function startAdventure(index) {
    console.log("Starting adventure for character at index:", index);
    model.data.selectedCharacter = model.data.characters[index];
    console.log("Selected Character:", model.data.selectedCharacter.name);
    model.data.log = [];
    model.data.inAdventure = true;
    console.log("Current Location:", model.data.currentLocation);
    addToLog(model.data.selectedCharacter.name + " sets out on an adventure!");
    updateView();
    const transitionOverlay = app.querySelector('#transitionOverlay');
    console.log("transitionOverlay display after startAdventure:", transitionOverlay ? transitionOverlay.style.display : "Not found");
}

function endAdventure() {
    model.data.inAdventure = false;
    model.data.selectedCharacter = null;
    model.data.currentEnemy = null;
    model.data.log = [];
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

function addToLog(message) {
    model.data.log.push(message);
}