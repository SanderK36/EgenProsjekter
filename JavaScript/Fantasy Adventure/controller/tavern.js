function openTavern() {
    const modal = app.querySelector("#tavernModal");
    let modalContent = /*HTML*/ `
        <h3>Welcome to the Tavern</h3>
        <div class="tavern-options">
            <h4>Buy Items</h4>
    `;
    model.data.tavernItems.forEach((item, index) => {
        modalContent += /*HTML*/ `
            <button onclick="buyItem(${index})">${item.name} (${item.price} Gold)</button>
        `;
    });
    modalContent += /*HTML*/ `
            <h4>Sell Items</h4>
    `;
    const char = model.data.selectedCharacter;
    const sellableItems = char.inventory.filter(item => ["Rusty Axe", "Orc tooth"].includes(item.name));
    if (sellableItems.length === 0) {
        modalContent += /*HTML*/ `<p>No items to sell!</p>`;
    } else {
        sellableItems.forEach((item, index) => {
            const sellPrice = item.name === "Rusty Axe" ? 15 : 5;
            modalContent += /*HTML*/ `
                <button onclick="sellItem('${item.name}', ${sellPrice})">${item.name} (${item.count}) - Sell for ${sellPrice} Gold</button>
            `;
        });
    }
    modalContent += /*HTML*/ `
        </div>
        <button onclick="hideTavernModal()">Leave Tavern</button>
    `;
    modal.innerHTML = modalContent;
    modal.style.display = "block";
    modal.style.opacity = "0";
    setTimeout(() => modal.style.opacity = "1", 10);
}

function hideTavernModal() {
    const modal = app.querySelector("#tavernModal");
    modal.style.opacity = "0";
    setTimeout(() => modal.style.display = "none", 300);
}

function buyItem(index) {
    const item = model.data.tavernItems[index];
    const char = model.data.selectedCharacter;
    if (model.data.gold >= item.price) {
        model.data.gold -= item.price;
        const existingItem = char.inventory.find(i => i.name === item.name);
        if (existingItem) {
            existingItem.count += 1;
        } else {
            char.inventory.push({name: item.name, count: 1});
        }
        addToLog(`${char.name} buys a ${item.name} for ${item.price} gold. Gold left: ${model.data.gold}`);
    } else {
        addToLog(`${char.name} doesn't have enough gold to buy a ${item.name}!`);
    }
    hideTavernModal();
    updateView();
}

function sellItem(itemName, price) {
    const char = model.data.selectedCharacter;
    const item = char.inventory.find(i => i.name === itemName);
    if (item && item.count > 0) {
        item.count -= 1;
        model.data.gold += price;
        addToLog(`${char.name} sells a ${itemName} for ${price} gold. Gold: ${model.data.gold}`);
        if (item.count === 0) {
            char.inventory.splice(char.inventory.indexOf(item), 1);
        }
    }
    hideTavernModal();
    updateView();
}