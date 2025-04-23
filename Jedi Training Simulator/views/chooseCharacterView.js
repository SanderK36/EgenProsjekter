const app = document.getElementById('app')
function updateView() {
    // Find the selected character (null if none selected)
    const selectedCharacter = model.app.currentCharacterId !== null
        ? model.data.characters.find(char => char.id === model.app.currentCharacterId)
        : null;

    app.innerHTML = /*HTML*/`
        <div id="header">
            <h1>Jedi Training Simulator</h1>
            ${selectedCharacter ? /*HTML*/`
                <span class="character-status">
                    Padawan: ${selectedCharacter.name} 
                    (${selectedCharacter.isLightSide ? 'Light Side' : 'Dark Side'})
                </span>
            ` : ''}
        </div>
        <div class="game-area">
            ${selectedCharacter ? /*HTML*/`
                <div class="character-profile">
                    <h2>${selectedCharacter.name}</h2>
                    <p>Force Strength: ${selectedCharacter.forceStrength}</p>
                    <p>Saber Skill: ${selectedCharacter.saberSkill}</p>
                    <p>Wisdom: ${selectedCharacter.wisdom}</p>
                    <button class="chooseCharBtn" onclick="resetCharacter()">Change Padawan</button>
                </div>
            ` : /*HTML*/`
                <div class="welcome">
                    <h2>Select Your Padawan</h2>
                    <div class="character-list">
                        ${model.data.characters.map(char => /*HTML*/`
                            <button 
                                class="chooseCharBtn ${char.isLightSide ? 'light-side' : 'dark-side'}" 
                                onclick="selectCharacter(${char.id})"
                            >
                                ${char.name}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `}
        </div>
    `;
}


updateView();