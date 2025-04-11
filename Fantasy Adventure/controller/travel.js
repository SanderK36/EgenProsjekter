function travel() {
    const modal = app.querySelector("#travelModal");
    let modalContent = /*HTML*/ `
        <h3>Choose Your Destination</h3>
        <div class="travel-buttons">
    `;
    model.data.locations.forEach((loc, index) => {
        if (loc.name !== model.data.currentLocation) {
            modalContent += /*HTML*/ `
                <button onclick="travelTo(${index}); hideTravelModal()">${loc.name}</button>
            `;
        }
    });
    modalContent += /*HTML*/ `
        </div>
        <button onclick="hideTravelModal()">Cancel</button>
    `;
    modal.innerHTML = modalContent;
    modal.style.display = "block";
    modal.style.opacity = "0";
    setTimeout(() => modal.style.opacity = "1", 10);
}

function travelTo(locationIndex) {
    const nextLocation = model.data.locations[locationIndex];
    const charName = model.data.selectedCharacter.name;
    const overlay = app.querySelector("#transitionOverlay");
    overlay.innerHTML = /*HTML*/`
        <h3>Traveling to ${nextLocation.name}</h3>
        <p>${nextLocation.description}</p>
    `;
    overlay.style.display = "flex";
    overlay.style.opacity = "0";

    setTimeout(() => {
        overlay.style.transition = "opacity 0.5s ease";
        overlay.style.opacity = "1";
    }, 10);
    setTimeout(() => {
        overlay.style.opacity = "0";
        setTimeout(() => {
            overlay.style.display = "none";
            model.data.currentLocation = nextLocation.name;
            addToLog(`${charName} travels to ${nextLocation.name}.`);
            if (nextLocation.name !== "Tavern" && Math.random() < 0.3) {
                explore();
            }
            updateView();
        }, 500);
    }, 2000);
}

function hideTravelModal() {
    const modal = app.querySelector("#travelModal");
    modal.style.opacity = "0";
    setTimeout(() => modal.style.display = "none", 300);
}