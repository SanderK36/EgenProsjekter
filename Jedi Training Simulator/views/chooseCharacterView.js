const app = document.getElementById('app');

function updateView() {
    const selectedCharacter = model.app.currentCharacterId !== null
        ? model.data.characters.find(char => char.id === model.app.currentCharacterId)
        : null;
    const opponent = selectedCharacter
        ? model.data.characters.find(char => char.id !== model.app.currentCharacterId)
        : null;

    app.innerHTML = /*HTML*/`
        <div id="notification" class="notification hidden"></div>
        <div id="header">
            <h1>Jedi Training Simulator</h1>
            ${selectedCharacter ? /*HTML*/`
                <span class="character-status ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}">
                    Padawan: ${selectedCharacter.name} (${selectedCharacter.isLightSide ? 'Light Side' : 'Dark Side'})
                </span>
            ` : ''}
        </div>
        <div class="game-area">
            ${selectedCharacter ? /*HTML*/`
                <div class="character-profile ${!selectedCharacter.isLightSide ? 'dark-side' : ''}">
                    <img src="${selectedCharacter.image}" alt="${selectedCharacter.name}" class="character-image ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}">
                    <h2>${selectedCharacter.xp} XP of ${selectedCharacter.xpToNextLevel} to next level</h2>
                    <h2>${selectedCharacter.name} level: ${selectedCharacter.level}</h2>
                    <h2>${selectedCharacter.master}</h2>
                    <p>Force Strength: ${selectedCharacter.forceStrength}</p>
                    <p>Saber Skill: ${selectedCharacter.saberSkill}</p>
                    <p>Wisdom: ${selectedCharacter.wisdom}</p>
                    <p>Stamina: ${selectedCharacter.stamina}</p>
                    <p>Light Side: ${selectedCharacter.lightSide}</p>
                    <p>Dark Side: ${selectedCharacter.darkSide}</p>
                    <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="resetCharacter()">Change Padawan</button>
                    <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="showTrainModal()">Train</button>
                    <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="showForceModal()">Train Force</button>
                    <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="sparAgainst()">Spar against ${opponent.name}</button>
                    <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="rest()">Rest</button>
                    <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="travel()">Travel</button>
                </div>
                <dialog class="train-modal ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" id="trainModal">
                    <h2>Training Options</h2>
                    <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="trainWisdom()">Train Wisdom</button>
                    <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="trainSaber()">Train Saber Skills</button>
                    <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="trainStamina()">Train Stamina</button>
                    <button class="modal-close-btn" onclick="closeTrainModal()">Close</button>
                </dialog>
                <dialog class="force-modal ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" id="forceModal">
                    <h2>Force Training Options</h2>
                    <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="trainLightSide()">Train Light Side</button>
                    <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="trainDarkSide()">Train Dark Side</button>
                    <button class="modal-close-btn" onclick="closeForceModal()">Close</button>
                </dialog>
            ` : /*HTML*/`
                <div class="welcome">
                    <h2>Select Your Padawan</h2>
                    <div class="character-list">
                        ${model.data.characters.map(char => /*HTML*/`
                            <div class="character-preview ${char.isLightSide ? 'light-side' : 'dark-side'}">
                                <img src="${char.image}" alt="${char.name}" class="character-image ${char.isLightSide ? 'light-side' : 'dark-side'}">
                                <h3>${char.name}</h3>
                                <p>Master: ${char.master}</p>
                                <p>Alignment: ${char.isLightSide ? 'Light Side' : 'Dark Side'}</p>
                                <button class="chooseCharBtn ${char.isLightSide ? 'light-side' : 'dark-side'}" onclick="selectCharacter(${char.id})">Choose ${char.name}</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `}
        </div>
    `;
}

updateView();