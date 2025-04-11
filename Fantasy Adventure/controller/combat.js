function playerAttack() {
    let char = model.data.selectedCharacter;
    let orc = model.data.currentEnemy;
    let damage = 0;
    if (char.classType === "mage") {
        damage = Math.floor(char.magic * 0.4);
        addToLog(char.name + " casts a fireball, dealing " + damage + " damage!");
    } else if (char.classType === "warrior") {
        damage = Math.floor(char.strength * 0.8);
        addToLog(char.name + " slashes with a sword, dealing " + damage + " damage!");
    } else if (char.classType === "archer") {
        damage = Math.floor(char.strength * 0.6 + char.magic * 0.3);
        addToLog(char.name + " shoots an arrow, dealing " + damage + " damage!");
    } else if (char.classType === "thief") {
        damage = Math.random() < 0.4 ? char.strength * 1.5 : char.strength;
        addToLog(char.name + " stabs sneakily, dealing " + damage + " damage" + (damage > char.strength ? " (critical hit!)" : "") + "!");
    } else if (char.classType === "dwarf") {
        damage = Math.floor(char.strength * 0.9);
        addToLog(char.name + " smashes with an axe, dealing " + damage + " damage!");
    }
    orc.hp -= damage;
    if (orc.hp <= 0) {
        addToLog("The orc is defeated!");
        const xpGain = 50;
        char.xp += xpGain;
        addToLog(`${char.name} gains ${xpGain} XP! Total XP: ${char.xp}`);
        levelUp(char);
        const drop = model.data.orcDrops[Math.floor(Math.random() * model.data.orcDrops.length)];
        if (drop === "10 Gold") {
            model.data.gold += 10;
            addToLog(`${char.name} finds 10 gold! Total gold: ${model.data.gold}`);
        } else {
            const existingItem = char.inventory.find(item => item.name === drop);
            if (existingItem) {
                existingItem.count += 1;
            } else {
                char.inventory.push({name: drop, count: 1});
            }
            addToLog(`${char.name} finds a ${drop} from the orc!`);
        }
        model.data.currentEnemy = null;
    } else {
        orcAttack();
    }
    updateView();
}

function orcAttack() {
    let char = model.data.selectedCharacter;
    let orcDamage = Math.floor(Math.random() * 16) + 5;
    char.hp -= orcDamage;
    addToLog("The orc fights back, dealing " + orcDamage + " damage. HP left: " + char.hp);
    if (char.hp <= 0) {
        addToLog(char.name + " has fallen in battle...");
        model.data.inAdventure = false;
    }
}

function specialAttack() {
    let char = model.data.selectedCharacter;
    let orc = model.data.currentEnemy;
    let damage = 0;
    let cost = 40;
    if (char.mana >= cost || char.stamina >= cost) {
        if (char.classType === "mage") {
            damage = Math.floor(char.magic * 0.8);
            char.mana -= cost;
            addToLog(`${char.name} unleashes Light of the Istari, dealing ${damage} damage! Mana: ${char.mana}`);
        } else if (char.classType === "warrior") {
            damage = Math.floor(char.strength * 1.2);
            char.stamina -= cost;
            addToLog(`${char.name} performs a mighty cleave, dealing ${damage} damage! Stamina: ${char.stamina}`);
        }
        orc.hp -= damage;
        if (orc.hp <= 0) {
            addToLog("The orc is defeated!");
            const xpGain = 50;
            char.xp += xpGain;
            addToLog(`${char.name} gains ${xpGain} XP! Total XP: ${char.xp}`);
            levelUp(char);
            const drop = model.data.orcDrops[Math.floor(Math.random() * model.data.orcDrops.length)];
            if (drop === "10 Gold") {
                model.data.gold += 10;
                addToLog(`${char.name} finds 10 gold! Total gold: ${model.data.gold}`);
            } else {
                const existingItem = char.inventory.find(item => item.name === drop);
                if (existingItem) {
                    existingItem.count += 1;
                } else {
                    char.inventory.push({name: drop, count: 1});
                }
                addToLog(`${char.name} finds a ${drop} from the orc!`);
            }
            model.data.currentEnemy = null;
        } else {
            orcAttack();
        }
    } else {
        addToLog(`${char.name} doesn't have enough mana or stamina for a special attack!`);
    }
    updateView();
}

function playerRun() {
    if (Math.random() < 0.7) {
        addToLog(model.data.selectedCharacter.name + " Runs away safely!");
        model.data.currentEnemy = null;
    } else {
        addToLog(model.data.selectedCharacter.name + " fails to escape!");
        orcAttack();
    }
    updateView();
}

function levelUp(char) {
    if (char.xp >= char.xpToNextLevel) {
        char.level += 1;
        char.xp -= char.xpToNextLevel;
        char.xpToNextLevel = Math.floor(char.xpToNextLevel * 1.5);
        char.hp += 20;
        char.strength += 5;
        char.magic += 5;
        if (char.mana) char.mana += 10;
        if (char.stamina) char.stamina += 10;
        addToLog(`${char.name} has reached level ${char.level}! Stats increased.`);
    }
}