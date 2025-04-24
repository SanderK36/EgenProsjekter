const app = document.getElementById('app');

function updateView() {
    const selectedCharacter = model.app.currentCharacterId !== null
        ? model.data.characters.find(char => char.id === model.app.currentCharacterId)
        : null;

    app.innerHTML = /*HTML*/`
        <div id="header">
            <h1>Jedi Training Simulator</h1>
            ${selectedCharacter ? /*HTML*/`
                <span class="character-status ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}"> <span class="character-status ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="resetCharacter()">Change Padawan <span class="character-status ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="resetCharacter()"> | </span></span>Padawan: ${selectedCharacter.name}(${selectedCharacter.isLightSide ? 'Light Side' : 'Dark Side'})</span>` : ''}
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
                    <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="trainWisdom()">Train Wisdom</button>
                    <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="trainSaber()">Train Saber Skills</button>
                    <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="trainForce()">Train Force Strength</button>
                    <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="rest()">rest</button>
                </div>
            ` : /*HTML*/`
                <div class="welcome">
                    <h2>Select Your Padawan</h2>
                    <div class="character-list">
                        ${model.data.characters.map(char => /*HTML*/`
                            <button class="chooseCharBtn ${char.isLightSide ? 'light-side' : 'dark-side'}" onclick="selectCharacter(${char.id})">${char.name}</button>
                        `).join('')}
                    </div>
                </div>
            `}
        </div>
    `;
}

updateView();