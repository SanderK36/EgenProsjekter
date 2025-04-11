function showInventory(index, button) {
    const inventoryDiv = button.nextElementSibling;
    const character = model.data.characters[index];
    const inventoryList = character.inventory.map(item => `${item.name} (${item.count})`).join(", ");

    if (inventoryDiv.style.display === "none" || inventoryDiv.innerHTML === "") {
        inventoryDiv.innerHTML = `<strong>Inventory:</strong> ${inventoryList}`;
        inventoryDiv.style.display = "block";
    } else {
        inventoryDiv.style.display = "none";
    }
}

 function startAdventure(index) {
    model.data.selectedCharacter = model.data.characters[index];
    model.data.log = [];
    model.data.inAdventure = true;
    addToLog(model.data.selectedCharacter.name + " sets out on an adventure!");
    updateView();
 }

 function explore() {
    if (Math.random() < 0.5) {
        const randomIndex = Math.floor(Math.random() * model.data.orcImages.length);
        model.data.currentEnemy = {
            hp: 250,
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

 function adventureStep() {
    const character = model.data.selectedCharacter;
    if(character.hp <= 0) {
        addToLog(character.name + " has fallen in battle.. his bravery will not be forgotten.");
        return;
    }

    if (Math.random() < 0.5) {
        fightOrc(character);
    } else {
        addToLog(character.name + " explores and finds nothing...");
    }
    updateView();
    setTimeout(adventureStep, 2000);
 }

 function playerAttack() {
    let char = model.data.selectedCharacter;
    let orc = model.data.currentEnemy;
    let damage = 0;
    if (char.classType === "mage") {
        damage = Math.floor(char.magic * 0.5);
        addToLog(char.name + " casts a fireball, dealing " + damage + " damage!");
    } else if (char.classType === "warrior") {
        damage = char.strength;
        addToLog(char.name + " slashes with a sword, dealing " + damage + " damage!");
    } else if (char.classType === "archer") {
        damage = char.strength + Math.floor(char.magic * 0.2);
        addToLog(char.name + " shoots an arrow, dealing " + damage + " damage!");
    } else if (char.classType === "thief") {
        damage = Math.random() < 0.3 ? char.strength * 2 : char.strength;
        addToLog(char.name + " stabs sneakily, dealing " + damage + " damage" + (damage > char.strength ? " (critical hit!)" : "") + "!");
    } else if (char.classType === "dwarf") {
        damage = char.strength + 20;
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
    let orcDamage = Math.floor(Math.random() * 21) + 10; // 10-30 damage
    char.hp -= orcDamage;
    addToLog("The orc fights back, dealing " + orcDamage + " damage. HP left: " + char.hp);
    if (char.hp <= 0) {
        addToLog(char.name + " has fallen in battle...");
        model.data.inAdventure = false; // Back to list
    }
}

function rest(){
    let char = model.data.selectedCharacter;
    char.hp += 20;
    addToLog(char.name + " rests and recovers 20 HP. Current HP: " + char.hp);
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

function endAdventure() {
    model.data.inAdventure = false;
    model.data.selectedCharacter = null;
    model.data.currentEnemy = null;
    model.data.log = [];
    updateView();
}

function useItem() {
    const modal = app.querySelector("#itemModal");
    let modalContent = /*HTML*/ `
        <h3>Use an Item</h3>
        <div class="item-buttons">
    `;
    const char = model.data.selectedCharacter;
    const usableItems = char.inventory.filter(item => ["Health potion", "Mana potion"].includes(item.name));
    if (usableItems.length === 0) {
        modalContent += /*HTML*/ `<p>No usable items available!</p>`;
    } else {
        usableItems.forEach((item, index) => {
            modalContent += /*HTML*/ `
                <button onclick="useSelectedItem('${item.name}')">${item.name} (${item.count})</button>
            `;
        });
    }
    modalContent += /*HTML*/ `
        </div>
        <button onclick="hideItemModal()">Cancel</button>
    `;
    modal.innerHTML = modalContent;
    modal.style.display = "block";
    modal.style.opacity = "0";
    setTimeout(() => modal.style.opacity = "1", 10);
}

function useSelectedItem(itemName) {
    let char = model.data.selectedCharacter;
    const item = char.inventory.find(i => i.name === itemName);
    if (!item || item.count <= 0) {
        addToLog(`${char.name} has no ${itemName} left!`);
        hideItemModal();
        updateView();
        return;
    }

    if (itemName === "Health potion") {
        char.hp += 50;
        addToLog(`${char.name} uses a Health potion, restoring 50 HP. HP: ${char.hp}`);
    } else if (itemName === "Mana potion") {
        char.mana = (char.mana || 0) + 50;
        addToLog(`${char.name} uses a Mana potion, restoring 50 mana. Mana: ${char.mana}`);
    }

    item.count -= 1;
    if (item.count === 0) {
        char.inventory.splice(char.inventory.indexOf(item), 1);
    }
    hideItemModal();
    updateView();
}

function hideItemModal() {
    const modal = app.querySelector("#itemModal");
    modal.style.opacity = "0";
    setTimeout(() => modal.style.display = "none", 300);
}

function specialAttack() {
    let char = model.data.selectedCharacter;
    let orc = model.data.currentEnemy;
    let damage = 0;
    let cost = 30;
    if (char.mana >= cost || char.stamina >= cost) {
        if (char.classType === "mage") {
            damage = char.magic;
            char.mana -= cost;
            addToLog(`${char.name} unleashes Light of the Istari, dealing ${damage} damage! Mana: ${char.mana}`);
        } else if (char.classType === "warrior") {
            damage = char.strength * 1.5;
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

function travel() {
    const modal = app.querySelector("#travelModal");
    let modalContent = /*HTML*/ `
        <h3>Choose Your Destination</h3>
        <div class="travel-buttons">
    `;
    model.data.locations.forEach((loc, index) => {
        if (loc.name !== model.data.currentLocation) {
            modalContent += /*HTML*/ `
                <button onclick="travelTo(${index}); hideTravelModal()">${loc.name}</button>
            `;
        }
    });
    modalContent += /*HTML*/ `
        </div>
        <button onclick="hideTravelModal()">Cancel</button>
    `;
    modal.innerHTML = modalContent;
    modal.style.display = "block";
    modal.opacity = "0";
    setTimeout(() => modal.style.opacity = "1", 10);
}

function hideTravelModal() {
    const modal = app.querySelector("#travelModal");
    modal.style.opacity = "0";
    setTimeout(() => modal.style.display = "none", 300);
}

function showAdventureInventory(button) {
    const inventoryDiv = button.nextElementSibling;
    const character = model.data.selectedCharacter;
    const inventoryList = character.inventory.map(item => `${item.name} (${item.count})`).join(", ");

    if (inventoryDiv.style.display === "none" || inventoryDiv.innerHTML === "") {
        inventoryDiv.innerHTML = `<strong>Inventory:</strong> ${inventoryList}`;
        inventoryDiv.style.display = "block";
    } else {
        inventoryDiv.style.display = "none";
    }
}

function travelTo(locationIndex) {
    const nextLocation = model.data.locations[locationIndex];
    const charName = model.data.selectedCharacter.name;
    const overlay = app.querySelector("#transitionOverlay");
    overlay.innerHTML = /*HTML*/`
        <h3>Traveling to ${nextLocation.name}</h3>
        <p>${nextLocation.description}</p>
    `;
    overlay.style.display = "flex";
    overlay.style.opacity = "0";

    setTimeout(() => {
        overlay.style.transition = "opacity 0.5s ease";
        overlay.style.opacity = "1";
    }, 10);
    setTimeout(() => {
        overlay.style.opacity = "0";
        setTimeout(() => {
            overlay.style.display = "none";
            model.data.currentLocation = nextLocation.name;
            addToLog(`${charName} travels to ${nextLocation.name}.`);
            if(Math.random() < 0.3) {
                explore();
            }
            updateView();
        }, 500);
    }, 2000);
}

function levelUp(char) {
    if (char.xp >= char.xpToNextLevel) {
        char.level += 1;
        char.xp -= char.xpToNextLevel;
        char.xpToNextLevel = Math.floor(char.xpToNextLevel * 1.5); // Increase XP needed for next level
        // Stat increases on level-up
        char.hp += 20;
        char.strength += 5;
        char.magic += 5;
        if (char.mana) char.mana += 10;
        if (char.stamina) char.stamina += 10;
        addToLog(`${char.name} has reached level ${char.level}! Stats increased.`);
    }
}