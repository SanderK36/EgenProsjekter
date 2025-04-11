const app = document.getElementById('app');
updateView();

function updateView() {
    let html = "";
    if (!model.data.inAdventure) {
        console.log("Rendering Character Select Screen");
        app.style.backgroundImage = `url(${model.data.characterSelectBackground})`;
        app.style.backgroundSize = "cover";
        app.style.backgroundPosition = "center";
        app.style.backgroundColor = "#3c2f2f";
        console.log("Character Select Background Path:", model.data.characterSelectBackground);
        html += /*HTML*/ `
            <div class="character-select-container">
                <h1>Choose Your Hero</h1>
                <div class="character-list">
        `;
        for (let i = 0; i < model.data.characters.length; i++) {
            const char = model.data.characters[i];
            html += /*HTML*/ `
                <div class="character-card">
                    <h3>${char.name}</h3>
                    <p>Class: ${char.classType}</p>
                    <div class="character-stats">
                        <span>HP: ${char.hp}</span>
                        <span>Strength: ${char.strength}</span>
                        <span>Magic: ${char.magic}</span>
                        <span>Level: ${char.level}</span>
                        <span>XP: ${char.xp}</span>
                    </div>
                    <div class="character-actions">
                        <button onclick="showInventory(${i}, this)">Inventory</button>
                        <button onclick="startAdventure(${i})">Go on Adventure!</button>
                    </div>
                </div>
            `;
        }
        html += /*HTML*/ `
                </div>
            </div>
            <div id="inventoryModal" class="inventory-modal"></div>
        `;
    } else {
        console.log("Rendering Adventure Screen");
        let char = model.data.selectedCharacter;
        const currentLocation = model.data.locations.find(loc => loc.name === model.data.currentLocation);
        console.log("Selected Character:", char.name);
        console.log("Current Location Object:", currentLocation);
        app.style.backgroundImage = `url(${currentLocation.backgroundImage})`;
        app.style.backgroundSize = "cover";
        app.style.backgroundPosition = "center";
        app.style.backgroundColor = "#3c2f2f";
        console.log("Adventure Background Path:", currentLocation.backgroundImage);
        html += /*HTML*/ `
            <div class="adventure-container">
                <div class="adventure-header">
                    <h1>${char.name}'s Adventure</h1>
                    <p class="location-info">Location: ${currentLocation.name} - ${currentLocation.description}</p>
                </div>
                <div class="adventure-stats">
                    <span>HP: ${char.hp}</span>
                    <span>Gold: ${model.data.gold}</span>
                    <span>Level: ${char.level}</span>
                    <span>XP: ${char.xp}</span>
                    <button onclick="showAdventureInventory(this)">Inventory</button>
                </div>
                <div class="adventure-main">
                    ${model.data.currentEnemy ? /*HTML*/`
                        <div class="enemy-section">
                            <img src="${model.data.currentEnemy.image}" class="orcImage" onerror="console.error('Failed to load orc image:', this.src)">
                            <p class="enemy-hp">Orc HP: ${model.data.currentEnemy.hp}</p>
                            <div class="action-buttons">
                                <button onclick="playerAttack()">Attack</button>
                                <button onclick="specialAttack()">Special Attack</button>
                                <button onclick="playerRun()">Run</button>
                            </div>
                        </div>
                    ` : /*HTML*/`
                        <div class="action-buttons">
                            <button onclick="explore()">Explore</button>
                            <button onclick="travel()">Travel</button>
                            <button onclick="rest()">Rest</button>
                            <button onclick="useItem()">Use Item</button>
                            ${currentLocation.name === "Tavern" ? '<button onclick="openTavern()">Visit Tavern</button>' : ''}
                            <button onclick="endAdventure()">Return to Party</button>
                        </div>
                    `}
                </div>
                <div class="adventure-log">
                    <h3>Adventure Log</h3>
                    <div class="log-content"></div>
                </div>
            </div>
            <div id="transitionOverlay" class="transition-overlay"></div>
            <div id="travelModal" class="travel-modal"></div>
            <div id="itemModal" class="item-modal"></div>
            <div id="tavernModal" class="tavern-modal"></div>
            <div id="inventoryModal" class="inventory-modal"></div>
        `;
    }
    console.log("Setting app HTML content");
    app.innerHTML = html;
    const logDiv = app.querySelector('.log-content');
    if (logDiv) {
        console.log("Updating adventure log with entries:", model.data.log);
        logDiv.innerHTML = model.data.log.map(log => `<p>${log}</p>`).join('');
        logDiv.scrollTo({ top: logDiv.scrollHeight, behavior: 'smooth' });
    } else {
        console.log("No adventure log div found");
    }
    const transitionOverlay = app.querySelector('#transitionOverlay');
    if (transitionOverlay) {
        transitionOverlay.style.display = "none";
        console.log("Ensured transitionOverlay is hidden on initial render");
    }
    const bgImage = new Image();
    bgImage.src = model.data.inAdventure
        ? model.data.locations.find(loc => loc.name === model.data.currentLocation).backgroundImage
        : model.data.characterSelectBackground;
    bgImage.onerror = () => {
        console.error("Failed to load background image:", bgImage.src);
        app.style.backgroundImage = "none";
        app.style.backgroundColor = "#3c2f2f";
        app.classList.add("no-background");
    };
    bgImage.onload = () => {
        app.classList.remove("no-background");
    };
}