function showInventory(index, button) {
    const modal = app.querySelector("#inventoryModal");
    const character = model.data.characters[index];
    const inventoryList = character.inventory.map(item => `${item.name} (${item.count})`).join(", ");
    modal.innerHTML = /*HTML*/ `
        <h3>${character.name}'s Inventory</h3>
        <p>${inventoryList}</p>
        <button onclick="hideInventoryModal()">Close</button>
    `;
    modal.style.display = "block";
    modal.style.opacity = "0";
    setTimeout(() => modal.style.opacity = "1", 10);
}

function showAdventureInventory(button) {
    const modal = app.querySelector("#inventoryModal");
    const character = model.data.selectedCharacter;
    const inventoryList = character.inventory.map(item => `${item.name} (${item.count})`).join(", ");
    modal.innerHTML = /*HTML*/ `
        <h3>${character.name}'s Inventory</h3>
        <p>${inventoryList}</p>
        <button onclick="hideInventoryModal()">Close</button>
    `;
    modal.style.display = "block";
    modal.style.opacity = "0";
    setTimeout(() => modal.style.opacity = "1", 10);
}

function hideInventoryModal() {
    const modal = app.querySelector("#inventoryModal");
    modal.style.opacity = "0";
    setTimeout(() => modal.style.display = "none", 300);
}