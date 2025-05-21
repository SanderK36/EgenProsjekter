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
    char.stamina = Math.min(250, char.stamina + 1);
    char.xp = 0;
    char.xpToNextLevel += 120;
    checkMissions(char);
    updateView();
    showNotification(`Level up! ${char.name} is now level ${char.level}!`, !char.isLightSide);
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
            levelUp(char);
        } else {
            checkMissions(char);
            showNotification("Wisdom trained! +2 Wisdom", !char.isLightSide);
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
            showNotification("Saber skills trained! +2 Saber Skill", !char.isLightSide);
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
        char.stamina = Math.min(250, char.stamina + 2);
        char.stamina = Math.max(0, char.stamina - 15); 
        char.xp += 25;
        updateView();
        if (char.xp >= char.xpToNextLevel) {
            levelUp(char);
        } else {
            checkMissions(char);
            showNotification("Stamina trained! +2 Stamina", !char.isLightSide);
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
    const now = Date.now();
    if (now - model.app.lastRestTime < 5000) {
        showNotification("You must wait before resting again!", !char.isLightSide);
        return;
    }
    char.stamina = Math.min(250, char.stamina + 30);
    model.app.lastRestTime = now;
    updateView();
    startRestCooldownTimer(); 
    showNotification(`${char.name} rested and gained 30 stamina!`, !char.isLightSide);
}


function getRestButtonState() {
    const now = Date.now();
    const timeSinceLastRest = now - (model.app.lastRestTime || 0);
    const cooldownDuration = 5000;
    if (timeSinceLastRest < cooldownDuration) {
        const secondsLeft = Math.ceil((cooldownDuration - timeSinceLastRest) / 1000);
        return { text: `Rest (${secondsLeft}s)`, disabled: true };
    }
    return { text: "Rest", disabled: false };
}

let cooldownInterval = null;
function startRestCooldownTimer() {
    if (cooldownInterval) clearInterval(cooldownInterval);
    cooldownInterval = setInterval(() => {
        const restButton = document.getElementById('restButton');
        const state = getRestButtonState();
        if (restButton) {
            restButton.textContent = state.text;
            restButton.disabled = state.disabled;
            restButton.classList.toggle('disabled', state.disabled);
            if (!state.disabled) {
                clearInterval(cooldownInterval); 
                cooldownInterval = null;
            }
        }
    }, 1000);
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

function startSparring() {
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

    model.app.isSparring = true;
    model.app.playerHealth = 100;
    model.app.opponentHealth = 100;
    model.app.currentTurn = 1;
    model.app.playerDefending = false;
    model.app.opponentDefending = false;
    char.stamina = Math.max(0, char.stamina - 20);
    updateView();
    showNotification(`Sparring begins: ${char.name} vs. ${opponent.name}!`, !char.isLightSide);
}

function performPlayerAction(action) {
    const char = model.data.characters.find(char => char.id === model.app.currentCharacterId);
    const opponent = model.data.characters.find(char => char.id !== model.app.currentCharacterId);
    if (!char || !opponent || !model.app.isSparring) {
        console.error("Invalid sparring state:", { char, opponent, isSparring: model.app.isSparring });
        showNotification("Error: Invalid sparring state!", false);
        endSparring();
        return;
    }

    let staminaCost = 0;
    let message = "";
    let damage = 0;

    switch (action) {
        case 'attack':
            staminaCost = 5;
            if (char.stamina < staminaCost) {
                showNotification("Not enough stamina to attack!", !char.isLightSide);
                return;
            }
            damage = 10 + Math.floor(char.saberSkill / 10) + Math.floor(Math.random() * 6);
            if (model.app.opponentDefending) damage = Math.floor(damage * 0.5);
            model.app.opponentHealth = Math.max(0, model.app.opponentHealth - damage);
            message = `Attack dealt ${damage} damage`;
            model.app.playerDefending = false;
            break;
        case 'defend':
            staminaCost = 3;
            if (char.stamina < staminaCost) {
                showNotification("Not enough stamina to defend!", !char.isLightSide);
                return;
            }
            model.app.playerDefending = true;
            message = `Defend reduced next damage by 50%`;
            break;
        case 'forcePush':
            staminaCost = 7;
            if (char.stamina < staminaCost) {
                showNotification("Not enough stamina for Force Push!", !char.isLightSide);
                return;
            }
            damage = 15 + Math.floor((char.isLightSide ? char.lightSide : char.darkSide) / 10) + Math.floor(Math.random() * 6);
            if (model.app.opponentDefending) damage = Math.floor(damage * 0.5);
            model.app.opponentHealth = Math.max(0, model.app.opponentHealth - damage);
            message = `Force Push dealt ${damage} damage`;
            model.app.playerDefending = false;
            break;
    }

    char.stamina = Math.max(0, char.stamina - staminaCost);
    console.log("Player action notification:", message);
    showNotification(message, !char.isLightSide);

    if (model.app.opponentHealth <= 0) {
        char.xp += 50;
        const leveledUp = char.xp >= char.xpToNextLevel;
        console.log("Showing win modal:", { char: char.name, opponent: opponent.name, leveledUp });
        showWinModal(char, opponent, leveledUp);
        endSparring();
        if (leveledUp) levelUp(char);
        else checkMissions(char);
        return;
    }

    performOpponentAction();
}

function performOpponentAction() {
    const char = model.data.characters.find(char => char.id === model.app.currentCharacterId);
    const opponent = model.data.characters.find(char => char.id !== model.app.currentCharacterId);
    if (!char || !opponent || !model.app.isSparring) {
        console.error("Invalid sparring state:", { char, opponent, isSparring: model.app.isSparring });
        showNotification("Error: Invalid sparring state!", false);
        endSparring();
        return;
    }

    let possibleActions = [];
    if (opponent.stamina >= 5) possibleActions.push('attack');
    if (opponent.stamina >= 3) possibleActions.push('defend');
    if (opponent.stamina >= 7) possibleActions.push('forcePush');
    if (possibleActions.length === 0) possibleActions.push('attack');

    const weights = { attack: 0.5, defend: 0.3, forcePush: 0.2 };
    if (opponent.stamina < 7) weights.forcePush = 0;
    if (opponent.stamina < 3) weights.defend = 0;
    if (opponent.stamina < 5) weights.attack = 1;

    const totalWeight = weights.attack + weights.defend + weights.forcePush; // Fixed typo (removed "weightsa")
    let random = Math.random() * totalWeight;
    let action;
    if (random < weights.attack) action = 'attack';
    else if (random < weights.attack + weights.defend) action = 'defend';
    else action = 'forcePush';

    let staminaCost = 0;
    let message = "";
    let damage = 0;

    switch (action) {
        case 'attack':
            staminaCost = 5;
            damage = 10 + Math.floor(opponent.saberSkill / 10) + Math.floor(Math.random() * 6);
            if (model.app.playerDefending) damage = Math.floor(damage * 0.5);
            model.app.playerHealth = Math.max(0, model.app.playerHealth - damage);
            message = `Opponent attacked, dealt ${damage} damage`;
            model.app.opponentDefending = false;
            break;
        case 'defend':
            staminaCost = 3;
            model.app.opponentDefending = true;
            message = `Opponent defended, reducing next damage by 50%`;
            break;
        case 'forcePush':
            staminaCost = 7;
            damage = 15 + Math.floor((opponent.isLightSide ? opponent.lightSide : opponent.darkSide) / 10) + Math.floor(Math.random() * 6);
            if (model.app.playerDefending) damage = Math.floor(damage * 0.5);
            model.app.playerHealth = Math.max(0, model.app.playerHealth - damage);
            message = `Opponent used Force Push, dealt ${damage} damage`;
            model.app.opponentDefending = false;
            break;
    }

    opponent.stamina = Math.max(0, opponent.stamina - staminaCost);
    console.log("Opponent action notification:", message);
    showNotification(message, !opponent.isLightSide);

    if (model.app.playerHealth <= 0) {
        char.xp += 10;
        const leveledUp = char.xp >= char.xpToNextLevel;
        console.log("Showing lose modal:", { char: char.name, opponent: opponent.name, leveledUp });
        showLoseModal(char, opponent, leveledUp);
        endSparring();
        if (leveledUp) levelUp(char);
        else checkMissions(char);
        return;
    }

    model.app.currentTurn += 1;
    updateView();
}


function showWinModal(char, opponent, leveledUp) {
    const modal = document.getElementById('winModal');
    if (modal) {
        modal.innerHTML = /*HTML*/`
            <h2>Victory!</h2>
            <p>You defeated ${opponent.name}!</p>
            <p>Gained 50 XP${leveledUp ? ` and leveled up to ${char.level + 1}!` : '.'}</p>
            <button class="modal-close-btn" onclick="closeWinModal()">Close</button>
        `;
        modal.className = `win-modal ${!char.isLightSide ? 'dark-side' : 'light-side'}`;
        try {
            modal.showModal();
        } catch (e) {
            console.error("Failed to show win modal:", e);
            showNotification("Victory! You defeated " + opponent.name + "!", !char.isLightSide);
        }
    } else {
        console.error("Win modal not found");
        showNotification("Victory! You defeated " + opponent.name + "!", !char.isLightSide);
    }
}

function closeWinModal() {
    const modal = document.getElementById('winModal');
    if (modal) {
        modal.close();
    } else {
        console.error("Win modal not found for closing");
    }
}

function showLoseModal(char, opponent, leveledUp) {
    const modal = document.getElementById('loseModal');
    if (modal) {
        modal.innerHTML = /*HTML*/`
            <h2>Defeat!</h2>
            <p>${opponent.name} bested you.</p>
            <p>Gained 10 XP for effort${leveledUp ? ` and leveled up to ${char.level + 1}!` : '.'}</p>
            <button class="modal-close-btn" onclick="closeLoseModal()">Close</button>
        `;
        modal.className = `lose-modal ${!char.isLightSide ? 'dark-side' : 'light-side'}`;
        try {
            modal.showModal();
        } catch (e) {
            console.error("Failed to show lose modal:", e);
            showNotification(opponent.name + " bested you. Gained 10 XP.", !char.isLightSide);
        }
    } else {
        console.error("Lose modal not found");
        showNotification(opponent.name + " bested you. Gained 10 XP.", !char.isLightSide);
    }
}

function closeLoseModal() {
    const modal = document.getElementById('loseModal');
    if (modal) {
        modal.close();
    } else {
        console.error("Lose modal not found for closing");
    }
}
function endSparring() {
    model.app.isSparring = false;
    model.app.playerHealth = 0;
    model.app.opponentHealth = 0;
    model.app.currentTurn = 0;
    model.app.playerDefending = false;
    model.app.opponentDefending = false;
    updateView();
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
        console.warn("Notification element not found:", message);
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