function selectCharacter(id) {
    model.app.currentCharacterId = id;
    updateView();
}

function resetCharacter() {
    model.app.currentCharacterId = null;
    updateView();
}

function levelUp(char) {
    char.level += 1;
    char.forceStrength = Math.min(100, char.forceStrength + 1);
    char.saberSkill = Math.min(100, char.saberSkill + 1);
    char.wisdom = Math.min(100, char.wisdom + 1);
    char.stamina = Math.min(100, char.stamina + 1);
    char.xp = 0;
    char.xpToNextLevel += 120;
}

function trainWisdom() {
    const char = model.data.characters.find(char => char.id === model.app.currentCharacterId);
    if (char.stamina >= 15) {
        char.wisdom = Math.min(100, char.wisdom + 2);
        char.stamina = Math.max(0, char.stamina - 15);
        char.xp += 25;
        if (char.xp >= char.xpToNextLevel) {
            levelUp(char);
        }
        updateView();
    } else {
        alert("Not enough stamina to train!");
    }
}

function trainSaber() {
    const char = model.data.characters.find(char => char.id === model.app.currentCharacterId);
    if (char.stamina >= 15) {
        char.saberSkill = Math.min(100, char.saberSkill + 2);
        char.stamina = Math.max(0, char.stamina - 15);
        char.xp += 25;
        if (char.xp >= char.xpToNextLevel) {
            levelUp(char);
        }
        updateView();
    } else {
        alert("Not enough stamina to train!");
    }
}

function trainForce() {
    const char = model.data.characters.find(char => char.id === model.app.currentCharacterId);
    if (char.stamina >= 15) {
        char.forceStrength = Math.min(100, char.forceStrength + 2);
        char.stamina = Math.max(0, char.stamina - 15);
        char.xp += 25;
        if (char.xp >= char.xpToNextLevel) {
            levelUp(char);
        }
        updateView();
    } else {
        alert("Not enough stamina to train!");
    }
}

function rest() {
    const char = model.data.characters.find(char => char.id === model.app.currentCharacterId);
    char.stamina = Math.min(100, char.stamina + 30);
    updateView();
}