 const model = {
    app:{},
    input:{},
    data:{
        characters:[
            {name:"Gandalf", classType:"mage", hp:120, strength:15,  magic:200, mana:100, xp: 0, level: 1, xpToNextLevel:100, inventory:[{name: "Great Staff", count: 1}, {name: "Magic Ring", cound:1}, {name: "Health potion", count: 1}, {name: "Mana potion", count: 1}]},

            {name:"Aragorn", classType:"warrior", hp:250, strength:90,  magic:20, stamina: 100, xp: 0, level: 1, xpToNextLevel:100, inventory:[{name: "Sword of Strider", count: 1}, {name: "Health potion", count: 1}, {name: "Shield of strength", count: 1}]},

            {name:"Legolas", classType:"archer", hp:160, strength:70,  magic:40, stamina: 100, xp: 0, level: 1, xpToNextLevel:100, inventory:[{name: "Bow of the Galadhrim", count: 1}, {name: "Health potion", count: 1}, {name: "Elven arrows", count: 100}, {name: "Elven dagger", count: 1}]},

            {name:"Frodo", classType:"thief", hp:130, strength:50,  magic:50, stamina: 100, xp: 0, level: 1, xpToNextLevel:100, inventory:[{name: "Hobbit short sword of dexterity", count: 1}, {name: "Health potion", count: 1}, {name: "Ring of invisibility", count: 1}]},

            {name:"Gimli", classType:"dwarf", hp:200, strength:100,  magic:15, stamina: 100, xp: 0, level: 1, xpToNextLevel:100, inventory:[{name: "Axe of the Dwarves", count: 1}, {name: "Health potion", count: 1},]},
        ],
        gold: 0,
        selectedCharacter: null,
        log: [],
        inAdventure: false,
        currentEnemy: null,
        orcImages: [
            "./imgs/bigAxeOrc.png",
            "./imgs/doubleAxeOrc.png"
        ],
        orcDrops: ["Rusty Axe", "Orc tooth", "10 Gold"],
        currentLocation: "Shire",
        locations: [
            {name: "Shire", description: "A peaceful place with rolling hills and hobbits.", backgroundImage: "./imgs/shire.png",},
            {name: "Misty Mountains", description: "A treacherous mountain range with hidden dangers.", backgroundImage: "./imgs/MistyMountains.png"},
            {name: "Mordor", description: "A dark land filled with orcs and evil.", backgroundImage: "./imgs/mordor.png"},
            {name: "Rivendell", description: "An elven sanctuary with healing powers.", backgroundImage: "./imgs/rivendell.png"},
            {name: "Isengard", description: "A tower of Saruman, filled with dark magic.", backgroundImage: "./imgs/isengard.jpg"},
            {name: "Tavern", description: "A cozy tavern where adventurers trade goods and rest.", backgroundImage: "./imgs/tavern.jpg"}
        ],
        tavernItems: [
            {name: "Health potion", price: 35},
            {name: "Mana potion", price: 50},

        ],
        characterSelectBackground: "./imgs/characterSelect.jpg"
    }

}