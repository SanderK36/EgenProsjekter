const app = document.getElementById('app')
        updateView();
        function updateView() {
            let html = "";
            if(!model.data.inAdventure) {
                html+=/*HTML*/`<ul>`;
                    for(let i = 0; i < model.data.characters.length; i++){
                        html+= /*HTML*/`
                        <li>
                            <strong>${model.data.characters[i].name}</strong> -
                            class: ${model.data.characters[i].classType}
                            HP: ${model.data.characters[i].hp}
                            Strength: ${model.data.characters[i].strength}
                            Magic: ${model.data.characters[i].magic}
                            <button onclick="showInventory(${i}, this)">Inventory</button>
                            <div class="inventoryBox"></div>
                            <button onclick="startAdventure(${i})">Go on Adventure!</button>
                        </li>
                        `;
                    }
                    html += /*HTML*/ `</ul>`;
            } else {
                let char = model.data.selectedCharacter;
                html += /*HTML*/`
                    <h2>${char.name}'s Adventure</h2>
                    <p>HP: ${char.hp} | Gold: ${model.data.gold}</p> 
                    <div class="adventureLog"></div>
                    <button onclick="showAdventureInventory(this)">Inventory</button>
                    <div class ="inventoryBox"></div>
                `;
                if(model.data.currentEnemy) {
                    html+= /*HTML*/ `
                        <img src="${model.data.currentEnemy.image}" class="orcImage">
                        <p>Orc HP: ${model.data.currentEnemy.hp}</p>
                        <button onclick="playerAttack()">Attack</button>
                        <button onclick="specialAttack()">Special Attack</button>
                        <button onclick="playerRun()">Run</button>
                    `;
                } else {
                    html += /*HTML*/`
                    <button onclick="explore()">Explore</button>
                    <button onclick="travel()">Travel</button>
                    <button onclick="rest()">Rest</button>
                    <button onclick="useItem()">Use Item</button>
                    <button onclick="endAdventure()">Return to Party</button>
                    `;
                }
            }
            app.innerHTML = html;
            const logDiv = app.querySelector('.adventureLog');
            app.querySelector('.adventureLog').innerHTML = model.data.log.map(log => `<p>${log}</p>`).join('');
            logDiv.scrollTo({ top: logDiv.scrollHeight, behavior: 'smooth' });
        }