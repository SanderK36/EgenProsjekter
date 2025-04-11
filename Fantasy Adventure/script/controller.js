function showInventory(index, button){
    const inventoryDiv = button.nextElementSibling;
    const character = model.data.characters[index];
    const inventoryList = character.inventory.join(", ");

    if(inventoryDiv.style.display === "none" || inventoryDiv.innerHTML === "") {
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
        const drop = model.data.orcDrops[Math.floor(Math.random() * model.data.orcDrops.length)];
        if(drop === "10 gold"){
            model.data.gold += 10;
            addToLog(`${char.name} finds 10 gold! Total gold: ${model.data.gold}`);
        } else {
            char.inventory.push(drop);
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
    let char = model.data.selectedCharacter;
    const healthPotionIndex = char.inventory.indexOf("Health potion");
    if(healthPotionIndex !== -1) {
        char.hp += 50;
        char.inventory.splice(healthPotionIndex, 1);
        addToLog(`${char.name} uses a Health potion, resotring 50 HP. HP: ${char.hp}`);
    } else {
        addToLog(`${char.name} has no Health potions left!`);
    }
    updateView();
}

function specialAttack() {
    let char = model.data.selectedCharacter;
    let orc = model.data.currentEnemy;
    let damage = 0;
    let cost = 30;
    if(char.mana >= cost || char.stamina >= cost) {
        if(char.classType === "mage") {
            damage = char.magic;
            char.mana -= cost;
            addToLog(`${char.name} unleashes Light of the Istari, dealing ${damage} damage! Mana: ${char.mana}`)
        } else if (char.classType === "warrior") {
            damage = char.strength * 1.5;
            char.stamina -= cost;
            addToLog(`${char.name} performs a mighty cleave, dealing ${damage} damage! Stamina: ${char.stamina}`)
        }
        orc.hp -= damage;
        if(orc.hp <= 0) {
            addToLog("The orc is defeated!");
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
    const nextLocationIndex = (model.data.locations.indexOf(model.data.currentLocation) + 1) % model.data.locations.length;
    model.data.currentLocation = model.data.locations[nextLocationIndex];
    addToLog(`${model.data.selectedCharacter.name} travels to ${model.data.currentLocation.name}.`);
    if(Math.random() < 0.3) {
        explore();
    }
    updateView();
}

function showAdventureInventory(button){
    const inventoryDiv = button.nextElementSibling;
    const character = model.data.selectedCharacter;
    const inventoryList = character.inventory.join(", ");

    if(inventoryDiv.style.display === "none" || inventoryDiv.innerHTML === "") {
        inventoryDiv.innerHTML = `<strong>Inventory:</strong> ${inventoryList}`;
        inventoryDiv.style.display = "block";
    } else {
        inventoryDiv.style.display = "none";
    }
}