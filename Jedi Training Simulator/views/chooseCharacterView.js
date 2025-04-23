const app = document.getElementById('app')
        updateView();
        function updateView() {
            app.innerHTML = /*HTML*/`
            <div id="header">
                <h1>Jedi Training Simulator</h1>
                <button class="chooseCharBtn">Choose your Character!</button>
            </div>
            `;
        }