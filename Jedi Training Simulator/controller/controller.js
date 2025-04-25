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
    char.saberSkill = Math.min(100, char.saberSkill + (char.isLightSide ? 1 : 2));
    char.wisdom = Math.min(100, char.wisdom + (char.isLightSide ? 2 : 1));
    char.stamina = Math.min(100, char.stamina + 1);
    char.xp = 0;
    char.xpToNextLevel += 120;
    checkMissions(char);
    updateView();
    showNotification(`Level up! ${char.name} is now level ${char.level}!`, !char.isLightSide); // Moved after updateView
}

function trainWisdom() {
    const char = model.data.characters.find(char => char.id === model.app.currentCharacterId);
    if (!char) {
        showNotification("Error: No character selected!", false);
        return;
    }
    if (char.stamina >= 15) {
        char.wisdom = Math.min(100, char.wisdom + 2);
        char.stamina = Math.max(0, char.stamina - 15);
        char.xp += 25;
        updateView();
        if (char.xp >= char.xpToNextLevel) {
            levelUp(char); // levelUp calls updateView and showNotification
        } else {
            checkMissions(char);
            showNotification("Wisdom trained! +2 Wisdom", !char.isLightSide); // Added confirmation
        }
    } else {
        updateView();
        showNotification("Not enough stamina to train!", !char.isLightSide);
    }
}

function trainSaber() {
    const char = model.data.characters.find(char => char.id === model.app.currentCharacterId);
    if (!char) {
        showNotification("Error: No character selected!", false);
        return;
    }
    if (char.stamina >= 15) {
        char.saberSkill = Math.min(100, char.saberSkill + 2);
        char.stamina = Math.max(0, char.stamina - 15);
        char.xp += 25;
        updateView();
        if (char.xp >= char.xpToNextLevel) {
            levelUp(char);
        } else {
            checkMissions(char);
            showNotification("Saber skills trained! +2 Saber Skill", !char.isLightSide); // Added
        }
    } else {
        updateView();
        showNotification("Not enough stamina to train!", !char.isLightSide);
    }
}

function trainStamina() {
    const char = model.data.characters.find(char => char.id === model.app.currentCharacterId);
    if (!char) {
        showNotification("Error: No character selected!", false);
        return;
    }
    if (char.stamina >= 15) {
        char.stamina = Math.min(100, char.stamina + 2);
        char.stamina = Math.max(0, char.stamina - 15);
        char.xp += 25;
        updateView();
        if (char.xp >= char.xpToNextLevel) {
            levelUp(char);
        } else {
            checkMissions(char);
            showNotification("Stamina trained! +2 Stamina", !char.isLightSide); // Added
        }
    } else {
        updateView();
        showNotification("Not enough stamina to train!", !char.isLightSide);
    }
}

function trainLightSide() {
    const char = model.data.characters.find(char => char.id === model.app.currentCharacterId);
    if (!char) {
        showNotification("Error: No character selected!", false);
        return;
    }
    if (char.stamina >= 15) {
        char.lightSide = Math.min(100, char.lightSide + 2);
        char.forceStrength = Math.min(100, Math.floor((char.lightSide + char.darkSide) / 2));
        char.stamina = Math.max(0, char.stamina - 15);
        char.xp += 25;
        char.isLightSide = char.lightSide >= char.darkSide;
        updateView();
        if (char.xp >= char.xpToNextLevel) {
            levelUp(char);
        } else {
            checkMissions(char);
            showNotification(`Trained Light Side! ${char.name} leans ${char.isLightSide ? 'Light' : 'Dark'}.`, !char.isLightSide);
        }
    } else {
        updateView();
        showNotification("Not enough stamina to train!", !char.isLightSide);
    }
}

function trainDarkSide() {
    const char = model.data.characters.find(char => char.id === model.app.currentCharacterId);
    if (!char) {
        showNotification("Error: No character selected!", false);
        return;
    }
    if (char.stamina >= 15) {
        char.darkSide = Math.min(100, char.darkSide + 2);
        char.forceStrength = Math.min(100, Math.floor((char.lightSide + char.darkSide) / 2));
        char.stamina = Math.max(0, char.stamina - 15);
        char.xp += 25;
        char.isLightSide = char.lightSide >= char.darkSide;
        updateView();
        if (char.xp >= char.xpToNextLevel) {
            levelUp(char);
        } else {
            checkMissions(char);
            showNotification(`Trained Dark Side! ${char.name} leans ${char.isLightSide ? 'Light' : 'Dark'}.`, !char.isLightSide);
        }
    } else {
        updateView();
        showNotification("Not enough stamina to train!", !char.isLightSide);
    }
}

function rest() {
    const char = model.data.characters.find(char => char.id === model.app.currentCharacterId);
    if (!char) {
        showNotification("Error: No character selected!", false);
        return;
    }
    char.stamina = Math.min(100, char.stamina + 30);
    updateView();
    showNotification(`${char.name} rested and gained 30 stamina!`, !char.isLightSide); // Moved after updateView
}

function showTrainModal() {
    const modal = document.getElementById('trainModal');
    if (modal) modal.showModal();
}

function closeTrainModal() {
    const modal = document.getElementById('trainModal');
    if (modal) modal.close();
}

function showForceModal() {
    const modal = document.getElementById('forceModal');
    if (modal) modal.showModal();
}

function closeForceModal() {
    const modal = document.getElementById('forceModal');
    if (modal) modal.close();
}

function sparAgainst() {
    const char = model.data.characters.find(char => char.id === model.app.currentCharacterId);
    const opponent = model.data.characters.find(char => char.id !== model.app.currentCharacterId);
    if (!char || !opponent) {
        showNotification("Error: Character or opponent not found!", false);
        return;
    }
    if (char.stamina < 20) {
        showNotification("Not enough stamina to spar!", !char.isLightSide);
        return;
    }

    const charScore = char.saberSkill + char.forceStrength + (char.isLightSide ? char.lightSide : char.darkSide) + Math.random() * 10;
    const oppScore = opponent.saberSkill + opponent.forceStrength + (opponent.isLightSide ? opponent.lightSide : opponent.darkSide) + Math.random() * 10;

    char.stamina = Math.max(0, char.stamina - 20);
    let result = "";
    if (charScore > oppScore) {
        char.xp += 50;
        result = `Victory! ${char.name} defeated ${opponent.name} and gained 50 XP!`;
    } else {
        char.xp += 10;
        result = `Defeat! ${opponent.name} bested ${char.name}. Gained 10 XP for effort.`;
    }

    updateView();
    if (char.xp >= char.xpToNextLevel) {
        levelUp(char);
    } else {
        checkMissions(char);
        showNotification(result, !char.isLightSide);
    }
}

function travel() {
    const char = model.data.characters.find(char => char.id === model.app.currentCharacterId);
    if (!char) {
        showNotification("Error: No character selected!", false);
        return;
    }
    if (!model.data.locations || model.data.locations.length === 0) {
        showNotification("Error: No locations available!", !char.isLightSide);
        return;
    }
    const location = model.data.locations[Math.floor(Math.random() * model.data.locations.length)];
    if (!location.name || !location.event || typeof location.staminaCost !== 'number' || typeof location.xp !== 'number') {
        showNotification("Error: Invalid location data!", !char.isLightSide);
        return;
    }

    if (char.stamina < location.staminaCost) {
        showNotification(`Not enough stamina to travel to ${location.name}!`, !char.isLightSide);
        return;
    }

    char.stamina = Math.max(0, char.stamina - location.staminaCost);
    char.xp += location.xp;

    updateView();
    if (char.xp >= char.xpToNextLevel) {
        levelUp(char);
    } else {
        checkMissions(char);
        showNotification(`Traveled to ${location.name}: ${location.event}`, !char.isLightSide);
    }
}

function showNotification(message, isDarkSide) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = `notification ${isDarkSide ? 'dark-side' : 'light-side'}`;
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    } else {
        console.warn("Notification element not found:", message); // Debug
    }
}

function checkMissions(char) {
    if (!char || !model.data.missions) return;
    model.data.missions.forEach(mission => {
        if (!mission.completed && char[mission.requirement.stat] >= mission.requirement.value) {
            char.xp += mission.reward.xp;
            mission.completed = true;
            updateView();
            showNotification(`Mission Completed: ${mission.name}! Gained ${mission.reward.xp} XP!`, !char.isLightSide);
            if (char.xp >= char.xpToNextLevel) {
                levelUp(char);
            }
        }
    });
}