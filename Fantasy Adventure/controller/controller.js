// function showInventory(index, button) {
//     const modal = app.querySelector("#inventoryModal");
//     const character = model.data.characters[index];
//     const inventoryList = character.inventory.map(item => `${item.name} (${item.count})`).join(", ");
//     modal.innerHTML = /*HTML*/ `
//         <h3>${character.name}'s Inventory</h3>
//         <p>${inventoryList}</p>
//         <button onclick="hideInventoryModal()">Close</button>
//     `;
//     modal.style.display = "block";
//     modal.style.opacity = "0";
//     setTimeout(() => modal.style.opacity = "1", 10);
// }

// function startAdventure(index) {
//     console.log("Starting adventure for character at index:", index);
//     model.data.selectedCharacter = model.data.characters[index];
//     console.log("Selected Character:", model.data.selectedCharacter.name);
//     model.data.log = [];
//     model.data.inAdventure = true;
//     console.log("Current Location:", model.data.currentLocation);
//     addToLog(model.data.selectedCharacter.name + " sets out on an adventure!");
//     updateView();
//     const transitionOverlay = app.querySelector('#transitionOverlay');
//     console.log("transitionOverlay display after startAdventure:", transitionOverlay ? transitionOverlay.style.display : "Not found");
// }

// function explore() {
//     const currentLocation = model.data.currentLocation;
//     if (currentLocation === "Tavern") {
//         addToLog("The Tavern is a safe haven—no orcs here to bother you!");
//         updateView();
//         return;
//     }
//     if (Math.random() < 0.5) {
//         const randomIndex = Math.floor(Math.random() * model.data.orcImages.length);
//         model.data.currentEnemy = {
//             hp: 150,
//             image: model.data.orcImages[randomIndex]
//         };
//         addToLog("An orc appears! Prepare for battle!");
//     } else {
//         addToLog(model.data.selectedCharacter.name + " explores and finds nothing...");
//     }
//     updateView();
// }

// function addToLog(message) {
//     model.data.log.push(message);
// }

// function playerAttack() {
//     let char = model.data.selectedCharacter;
//     let orc = model.data.currentEnemy;
//     let damage = 0;
//     if (char.classType === "mage") {
//         damage = Math.floor(char.magic * 0.4);
//         addToLog(char.name + " casts a fireball, dealing " + damage + " damage!");
//     } else if (char.classType === "warrior") {
//         damage = Math.floor(char.strength * 0.8);
//         addToLog(char.name + " slashes with a sword, dealing " + damage + " damage!");
//     } else if (char.classType === "archer") {
//         damage = Math.floor(char.strength * 0.6 + char.magic * 0.3);
//         addToLog(char.name + " shoots an arrow, dealing " + damage + " damage!");
//     } else if (char.classType === "thief") {
//         damage = Math.random() < 0.4 ? char.strength * 1.5 : char.strength;
//         addToLog(char.name + " stabs sneakily, dealing " + damage + " damage" + (damage > char.strength ? " (critical hit!)" : "") + "!");
//     } else if (char.classType === "dwarf") {
//         damage = Math.floor(char.strength * 0.9);
//         addToLog(char.name + " smashes with an axe, dealing " + damage + " damage!");
//     }
//     orc.hp -= damage;
//     if (orc.hp <= 0) {
//         addToLog("The orc is defeated!");
//         const xpGain = 50;
//         char.xp += xpGain;
//         addToLog(`${char.name} gains ${xpGain} XP! Total XP: ${char.xp}`);
//         levelUp(char);
//         const drop = model.data.orcDrops[Math.floor(Math.random() * model.data.orcDrops.length)];
//         if (drop === "10 Gold") {
//             model.data.gold += 10;
//             addToLog(`${char.name} finds 10 gold! Total gold: ${model.data.gold}`);
//         } else {
//             const existingItem = char.inventory.find(item => item.name === drop);
//             if (existingItem) {
//                 existingItem.count += 1;
//             } else {
//                 char.inventory.push({name: drop, count: 1});
//             }
//             addToLog(`${char.name} finds a ${drop} from the orc!`);
//         }
//         model.data.currentEnemy = null;
//     } else {
//         orcAttack();
//     }
//     updateView();
// }

// function orcAttack() {
//     let char = model.data.selectedCharacter;
//     let orcDamage = Math.floor(Math.random() * 16) + 5;
//     char.hp -= orcDamage;
//     addToLog("The orc fights back, dealing " + orcDamage + " damage. HP left: " + char.hp);
//     if (char.hp <= 0) {
//         addToLog(char.name + " has fallen in battle...");
//         model.data.inAdventure = false;
//     }
// }

// function rest() {
//     let char = model.data.selectedCharacter;
//     char.hp += 20;
//     addToLog(char.name + " rests and recovers 20 HP. Current HP: " + char.hp);
//     updateView();
// }

// function playerRun() {
//     if (Math.random() < 0.7) {
//         addToLog(model.data.selectedCharacter.name + " Runs away safely!");
//         model.data.currentEnemy = null;
//     } else {
//         addToLog(model.data.selectedCharacter.name + " fails to escape!");
//         orcAttack();
//     }
//     updateView();
// }

// function endAdventure() {
//     model.data.inAdventure = false;
//     model.data.selectedCharacter = null;
//     model.data.currentEnemy = null;
//     model.data.log = [];
//     updateView();
// }

// function useItem() {
//     const modal = app.querySelector("#itemModal");
//     let modalContent = /*HTML*/ `
//         <h3>Use an Item</h3>
//         <div class="item-buttons">
//     `;
//     const char = model.data.selectedCharacter;
//     const usableItems = char.inventory.filter(item => ["Health potion", "Mana potion"].includes(item.name));
//     if (usableItems.length === 0) {
//         modalContent += /*HTML*/ `<p>No usable items available!</p>`;
//     } else {
//         usableItems.forEach((item, index) => {
//             modalContent += /*HTML*/ `
//                 <button onclick="useSelectedItem('${item.name}')">${item.name} (${item.count})</button>
//             `;
//         });
//     }
//     modalContent += /*HTML*/ `
//         </div>
//         <button onclick="hideItemModal()">Cancel</button>
//     `;
//     modal.innerHTML = modalContent;
//     modal.style.display = "block";
//     modal.style.opacity = "0";
//     setTimeout(() => modal.style.opacity = "1", 10);
// }

// function hideItemModal() {
//     const modal = app.querySelector("#itemModal");
//     modal.style.opacity = "0";
//     setTimeout(() => modal.style.display = "none", 300);
// }

// function useSelectedItem(itemName) {
//     let char = model.data.selectedCharacter;
//     const item = char.inventory.find(i => i.name === itemName);
//     if (!item || item.count <= 0) {
//         addToLog(`${char.name} has no ${itemName} left!`);
//         hideItemModal();
//         updateView();
//         return;
//     }

//     if (itemName === "Health potion") {
//         char.hp += 50;
//         addToLog(`${char.name} uses a Health potion, restoring 50 HP. HP: ${char.hp}`);
//     } else if (itemName === "Mana potion") {
//         char.mana = (char.mana || 0) + 50;
//         addToLog(`${char.name} uses a Mana potion, restoring 50 mana. Mana: ${char.mana}`);
//     }

//     item.count -= 1;
//     if (item.count === 0) {
//         char.inventory.splice(char.inventory.indexOf(item), 1);
//     }
//     hideItemModal();
//     updateView();
// }

// function specialAttack() {
//     let char = model.data.selectedCharacter;
//     let orc = model.data.currentEnemy;
//     let damage = 0;
//     let cost = 40;
//     if (char.mana >= cost || char.stamina >= cost) {
//         if (char.classType === "mage") {
//             damage = Math.floor(char.magic * 0.8);
//             char.mana -= cost;
//             addToLog(`${char.name} unleashes Light of the Istari, dealing ${damage} damage! Mana: ${char.mana}`);
//         } else if (char.classType === "warrior") {
//             damage = Math.floor(char.strength * 1.2);
//             char.stamina -= cost;
//             addToLog(`${char.name} performs a mighty cleave, dealing ${damage} damage! Stamina: ${char.stamina}`);
//         }
//         orc.hp -= damage;
//         if (orc.hp <= 0) {
//             addToLog("The orc is defeated!");
//             const xpGain = 50;
//             char.xp += xpGain;
//             addToLog(`${char.name} gains ${xpGain} XP! Total XP: ${char.xp}`);
//             levelUp(char);
//             const drop = model.data.orcDrops[Math.floor(Math.random() * model.data.orcDrops.length)];
//             if (drop === "10 Gold") {
//                 model.data.gold += 10;
//                 addToLog(`${char.name} finds 10 gold! Total gold: ${model.data.gold}`);
//             } else {
//                 const existingItem = char.inventory.find(item => item.name === drop);
//                 if (existingItem) {
//                     existingItem.count += 1;
//                 } else {
//                     char.inventory.push({name: drop, count: 1});
//                 }
//                 addToLog(`${char.name} finds a ${drop} from the orc!`);
//             }
//             model.data.currentEnemy = null;
//         } else {
//             orcAttack();
//         }
//     } else {
//         addToLog(`${char.name} doesn't have enough mana or stamina for a special attack!`);
//     }
//     updateView();
// }

// function levelUp(char) {
//     if (char.xp >= char.xpToNextLevel) {
//         char.level += 1;
//         char.xp -= char.xpToNextLevel;
//         char.xpToNextLevel = Math.floor(char.xpToNextLevel * 1.5);
//         char.hp += 20;
//         char.strength += 5;
//         char.magic += 5;
//         if (char.mana) char.mana += 10;
//         if (char.stamina) char.stamina += 10;
//         addToLog(`${char.name} has reached level ${char.level}! Stats increased.`);
//     }
// }

// function travel() {
//     const modal = app.querySelector("#travelModal");
//     let modalContent = /*HTML*/ `
//         <h3>Choose Your Destination</h3>
//         <div class="travel-buttons">
//     `;
//     model.data.locations.forEach((loc, index) => {
//         if (loc.name !== model.data.currentLocation) {
//             modalContent += /*HTML*/ `
//                 <button onclick="travelTo(${index}); hideTravelModal()">${loc.name}</button>
//             `;
//         }
//     });
//     modalContent += /*HTML*/ `
//         </div>
//         <button onclick="hideTravelModal()">Cancel</button>
//     `;
//     modal.innerHTML = modalContent;
//     modal.style.display = "block";
//     modal.style.opacity = "0";
//     setTimeout(() => modal.style.opacity = "1", 10);
// }

// function hideTravelModal() {
//     const modal = app.querySelector("#travelModal");
//     modal.style.opacity = "0";
//     setTimeout(() => modal.style.display = "none", 300);
// }

// function showAdventureInventory(button) {
//     const modal = app.querySelector("#inventoryModal");
//     const character = model.data.selectedCharacter;
//     const inventoryList = character.inventory.map(item => `${item.name} (${item.count})`).join(", ");
//     modal.innerHTML = /*HTML*/ `
//         <h3>${character.name}'s Inventory</h3>
//         <p>${inventoryList}</p>
//         <button onclick="hideInventoryModal()">Close</button>
//     `;
//     modal.style.display = "block";
//     modal.style.opacity = "0";
//     setTimeout(() => modal.style.opacity = "1", 10);
// }

// function hideInventoryModal() {
//     const modal = app.querySelector("#inventoryModal");
//     modal.style.opacity = "0";
//     setTimeout(() => modal.style.display = "none", 300);
// }

// function travelTo(locationIndex) {
//     const nextLocation = model.data.locations[locationIndex];
//     const charName = model.data.selectedCharacter.name;
//     const overlay = app.querySelector("#transitionOverlay");
//     overlay.innerHTML = /*HTML*/`
//         <h3>Traveling to ${nextLocation.name}</h3>
//         <p>${nextLocation.description}</p>
//     `;
//     overlay.style.display = "flex";
//     overlay.style.opacity = "0";

//     setTimeout(() => {
//         overlay.style.transition = "opacity 0.5s ease";
//         overlay.style.opacity = "1";
//     }, 10);
//     setTimeout(() => {
//         overlay.style.opacity = "0";
//         setTimeout(() => {
//             overlay.style.display = "none";
//             model.data.currentLocation = nextLocation.name;
//             addToLog(`${charName} travels to ${nextLocation.name}.`);
//             if (nextLocation.name !== "Tavern" && Math.random() < 0.3) {
//                 explore();
//             }
//             updateView();
//         }, 500);
//     }, 2000);
// }

// function openTavern() {
//     const modal = app.querySelector("#tavernModal");
//     let modalContent = /*HTML*/ `
//         <h3>Welcome to the Tavern</h3>
//         <div class="tavern-options">
//             <h4>Buy Items</h4>
//     `;
//     model.data.tavernItems.forEach((item, index) => {
//         modalContent += /*HTML*/ `
//             <button onclick="buyItem(${index})">${item.name} (${item.price} Gold)</button>
//         `;
//     });
//     modalContent += /*HTML*/ `
//             <h4>Sell Items</h4>
//     `;
//     const char = model.data.selectedCharacter;
//     const sellableItems = char.inventory.filter(item => ["Rusty Axe", "Orc tooth"].includes(item.name));
//     if (sellableItems.length === 0) {
//         modalContent += /*HTML*/ `<p>No items to sell!</p>`;
//     } else {
//         sellableItems.forEach((item, index) => {
//             const sellPrice = item.name === "Rusty Axe" ? 15 : 5;
//             modalContent += /*HTML*/ `
//                 <button onclick="sellItem('${item.name}', ${sellPrice})">${item.name} (${item.count}) - Sell for ${sellPrice} Gold</button>
//             `;
//         });
//     }
//     modalContent += /*HTML*/ `
//         </div>
//         <button onclick="hideTavernModal()">Leave Tavern</button>
//     `;
//     modal.innerHTML = modalContent;
//     modal.style.display = "block";
//     modal.style.opacity = "0";
//     setTimeout(() => modal.style.opacity = "1", 10);
// }

// function hideTavernModal() {
//     const modal = app.querySelector("#tavernModal");
//     modal.style.opacity = "0";
//     setTimeout(() => modal.style.display = "none", 300);
// }

// function buyItem(index) {
//     const item = model.data.tavernItems[index];
//     const char = model.data.selectedCharacter;
//     if (model.data.gold >= item.price) {
//         model.data.gold -= item.price;
//         const existingItem = char.inventory.find(i => i.name === item.name);
//         if (existingItem) {
//             existingItem.count += 1;
//         } else {
//             char.inventory.push({name: item.name, count: 1});
//         }
//         addToLog(`${char.name} buys a ${item.name} for ${item.price} gold. Gold left: ${model.data.gold}`);
//     } else {
//         addToLog(`${char.name} doesn't have enough gold to buy a ${item.name}!`);
//     }
//     hideTavernModal();
//     updateView();
// }

// function sellItem(itemName, price) {
//     const char = model.data.selectedCharacter;
//     const item = char.inventory.find(i => i.name === itemName);
//     if (item && item.count > 0) {
//         item.count -= 1;
//         model.data.gold += price;
//         addToLog(`${char.name} sells a ${itemName} for ${price} gold. Gold: ${model.data.gold}`);
//         if (item.count === 0) {
//             char.inventory.splice(char.inventory.indexOf(item), 1);
//         }
//     }
//     hideTavernModal();
//     updateView();
// }