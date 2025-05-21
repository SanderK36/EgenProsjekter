function useItem() {
    const modal = app.querySelector("#itemModal");
    let modalContent = /*HTML*/ `
        <h3>Use an Item</h3>
        <div class="item-buttons">
    `;
    const char = model.data.selectedCharacter;
    const usableItems = char.inventory.filter(item => ["Health potion", "Mana potion"].includes(item.name));
    if (usableItems.length === 0) {
        modalContent += /*HTML*/ `<p>No usable items available!</p>`;
    } else {
        usableItems.forEach((item, index) => {
            modalContent += /*HTML*/ `
                <button onclick="useSelectedItem('${item.name}')">${item.name} (${item.count})</button>
            `;
        });
    }
    modalContent += /*HTML*/ `
        </div>
        <button onclick="hideItemModal()">Cancel</button>
    `;
    modal.innerHTML = modalContent;
    modal.style.display = "block";
    modal.style.opacity = "0";
    setTimeout(() => modal.style.opacity = "1", 10);
}

function useSelectedItem(itemName) {
    let char = model.data.selectedCharacter;
    const item = char.inventory.find(i => i.name === itemName);
    if (!item || item.count <= 0) {
        addToLog(`${char.name} has no ${itemName} left!`);
        hideItemModal();
        updateView();
        return;
    }

    if (itemName === "Health potion") {
        char.hp += 50;
        addToLog(`${char.name} uses a Health potion, restoring 50 HP. HP: ${char.hp}`);
    } else if (itemName === "Mana potion") {
        char.mana = (char.mana || 0) + 50;
        addToLog(`${char.name} uses a Mana potion, restoring 50 mana. Mana: ${char.mana}`);
    }

    item.count -= 1;
    if (item.count === 0) {
        char.inventory.splice(char.inventory.indexOf(item), 1);
    }
    hideItemModal();
    updateView();
}

function hideItemModal() {
    const modal = app.querySelector("#itemModal");
    modal.style.opacity = "0";
    setTimeout(() => modal.style.display = "none", 300);
}