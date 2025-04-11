const app = document.getElementById('app');
updateView();

function updateView() {
    let html = "";
    if (!model.data.inAdventure) {
        app.style.backgroundImage = `url(${model.data.characterSelectBackground})`;
        app.style.backgroundSize = "cover";
        app.style.backgroundPosition = "center";
        html += /*HTML*/ `<ul>`;
        for (let i = 0; i < model.data.characters.length; i++) {
            html += /*HTML*/ `
                <li>
                    <strong>${model.data.characters[i].name}</strong> -
                    class: ${model.data.characters[i].classType}
                    HP: ${model.data.characters[i].hp}
                    Strength: ${model.data.characters[i].strength}
                    Magic: ${model.data.characters[i].magic}
                    Level: ${model.data.characters[i].level} | XP: ${model.data.characters[i].xp}
                    <button onclick="showInventory(${i}, this)">Inventory</button>
                    <div class="inventoryBox"></div>
                    <button onclick="startAdventure(${i})">Go on Adventure!</button>
                </li>
            `;
        }
        html += /*HTML*/ `</ul>`;
    } else {
        let char = model.data.selectedCharacter;
        const currentLocation = model.data.locations.find(loc => loc.name === model.data.currentLocation);
        app.style.backgroundImage = `url(${currentLocation.backgroundImage})`;
        app.style.backgroundSize = "cover";
        app.style.backgroundPosition = "center";
        html += /*HTML*/ `
            <h2>${char.name}'s Adventure</h2>
            <p>Location: ${currentLocation.name} - ${currentLocation.description}</p>
            <p>HP: ${char.hp} | Gold: ${model.data.gold}</p>
            <div class="adventureLog"></div>
            <button onclick="showAdventureInventory(this)">Inventory</button>
            <div class="inventoryBox"></div>
            <div id="transitionOverlay" class="transition-overlay"></div>
            <div id="travelModal" class="travel-modal"></div>
            <div id="itemModal" class="item-modal"></div>
            <div id="tavernModal" class="tavern-modal"></div> 
        `;
        if (model.data.currentEnemy) {
            html += /*HTML*/ `
                <img src="${model.data.currentEnemy.image}" class="orcImage">
                <p>Orc HP: ${model.data.currentEnemy.hp}</p>
                <button onclick="playerAttack()">Attack</button>
                <button onclick="specialAttack()">Special Attack</button>
                <button onclick="playerRun()">Run</button>
            `;
        } else {
            html += /*HTML*/ `
                <button onclick="explore()">Explore</button>
                <button onclick="travel()">Travel</button>
                <button onclick="rest()">Rest</button>
                <button onclick="useItem()">Use Item</button>
                ${currentLocation.name === "Tavern" ? '<button onclick="openTavern()">Visit Tavern</button>' : ''}
                <button onclick="endAdventure()">Return to Party</button>
            `;
        }
    }
    app.innerHTML = html;
    const logDiv = app.querySelector('.adventureLog');
    logDiv.innerHTML = model.data.log.map(log => `<p>${log}</p>`).join('');
    logDiv.scrollTo({ top: logDiv.scrollHeight, behavior: 'smooth' });
}
