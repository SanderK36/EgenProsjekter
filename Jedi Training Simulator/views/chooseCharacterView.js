const app = document.getElementById('app');

function updateView() {
    console.log("updateView called");
    const selectedCharacter = model.app.currentCharacterId !== null
        ? model.data.characters.find(char => char.id === model.app.currentCharacterId)
        : null;
    const opponent = selectedCharacter
        ? model.data.characters.find(char => char.id !== model.app.currentCharacterId)
        : null;

    const restButtonState = getRestButtonState();

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
                ${model.app.isSparring ? /*HTML*/`
                    <div class="sparring-view">
                        <h2>Sparring: Turn ${model.app.currentTurn}</h2>
                        <div class="combatants">
                            <div class="combatant ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}">
                                <img src="${selectedCharacter.image}" alt="${selectedCharacter.name}" class="character-image ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}">
                                <h3>${selectedCharacter.name}</h3>
                                <p>Health: ${model.app.playerHealth}</p>
                                <p>Stamina: ${selectedCharacter.stamina}</p>
                            </div>
                            <div class="combatant ${!opponent.isLightSide ? 'dark-side' : 'light-side'}">
                                <img src="${opponent.image}" alt="${opponent.name}" class="character-image ${!opponent.isLightSide ? 'dark-side' : 'light-side'}">
                                <h3>${opponent.name}</h3>
                                <p>Health: ${model.app.opponentHealth}</p>
                                <p>Stamina: ${opponent.stamina}</p>
                            </div>
                        </div>
                        <div class="health-bars">
                            <div class="health-bar">
                                <div class="health" style="width: ${model.app.playerHealth}%"></div>
                            </div>
                            <div class="health-bar">
                                <div class="health opponent" style="width: ${model.app.opponentHealth}%"></div>
                            </div>
                        </div>
                        <div class="actions">
                            <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="performPlayerAction('attack')" ${selectedCharacter.stamina < 5 ? 'disabled' : ''}>Attack (5 Stamina)</button>
                            <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="performPlayerAction('defend')" ${selectedCharacter.stamina < 3 ? 'disabled' : ''}>Defend (3 Stamina)</button>
                            <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="performPlayerAction('forcePush')" ${selectedCharacter.stamina < 7 ? 'disabled' : ''}>Force Push (7 Stamina)</button>
                            <button class="modal-close-btn" onclick="endSparring()">End Spar</button>
                        </div>
                    </div>
                    <dialog class="win-modal ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" id="winModal">
                        <h2>Victory!</h2>
                        <p>You defeated ${opponent.name}!</p>
                        <p>Gained 50 XP${selectedCharacter.xp >= selectedCharacter.xpToNextLevel ? ` and leveled up to ${selectedCharacter.level + 1}!` : '.'}</p>
                        <button class="modal-close-btn" onclick="closeWinModal()">Close</button>
                    </dialog>
                    <dialog class="lose-modal ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" id="loseModal">
                        <h2>Defeat!</h2>
                        <p>${opponent.name} bested you.</p>
                        <p>Gained 10 XP for effort${selectedCharacter.xp >= selectedCharacter.xpToNextLevel ? ` and leveled up to ${selectedCharacter.level + 1}!` : '.'}</p>
                        <button class="modal-close-btn" onclick="closeLoseModal()">Close</button>
                    </dialog>
                ` : /*HTML*/`
                    <div class="character-profile ${!selectedCharacter.isLightSide ? 'dark-side' : ''}">
                        <img src="${selectedCharacter.image}" alt="${selectedCharacter.name}" class="character-image ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}">
                        <h2>${selectedCharacter.xp} XP of ${selectedCharacter.xpToNextLevel} to next level</h2>
                        <h2>${selectedCharacter.name} level: ${selectedCharacter.level}</h2>
                        <h2>${selectedCharacter.master}</h2>
                        <p>Health: ${model.app.playerHealth}</p>
                        <p>Force Strength: ${selectedCharacter.forceStrength}</p>
                        <p>Saber Skill: ${selectedCharacter.saberSkill}</p>
                        <p>Wisdom: ${selectedCharacter.wisdom}</p>
                        <p>Stamina: ${selectedCharacter.stamina}</p>
                        <p>Light Side: ${selectedCharacter.lightSide}</p>
                        <p>Dark Side: ${selectedCharacter.darkSide}</p>
                        <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="resetCharacter()">Change Padawan</button>
                        <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="showTrainModal()">Train</button>
                        <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="showForceModal()">Train Force</button>
                        <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="startSparring()">Spar against ${opponent.name}</button>
                        <button id="restButton" class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'} ${restButtonState.disabled ? 'disabled' : ''}" onclick="rest()" ${restButtonState.disabled ? 'disabled' : ''}>${restButtonState.text}</button>
                        <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="showTravelModal()">Travel</button>
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
                    <dialog class="train-modal ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" id="travelModal">
                        <h2>Choose Destination</h2>
                        ${model.data.locations.map((location, index) => /*HTML*/`
                            <button class="chooseCharBtn ${!selectedCharacter.isLightSide ? 'dark-side' : 'light-side'}" onclick="travelTo(${index})">
                                Travel to ${location.name} (Cost: ${location.staminaCost} Stamina, Gain: ${location.xp} XP)
                            </button>
                        `).join('')}
                        <button class="modal-close-btn" onclick="closeTravelModal()">Close</button>
                    </dialog>
                `}
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