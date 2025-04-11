const model = {
    app:{},
    input:{},
    data:{
        characters:[
            {name:"Gandalf", classType:"mage", hp:150, strength:10,  magic:235, mana:100, xp: 0, level: 1, inventory:["Great Staff", "Magic Ring", "Mana potion", "Spellbook", "Health potion"]},
            {name:"Aragorn", classType:"warrior", hp:275, strength:80,  magic:20, stamina: 100, xp: 0, level: 1, inventory:["Sword", "Shield", "Health potion"]},
            {name:"Legolas", classType:"archer", hp:180, strength:60,  magic:30, stamina: 100, xp: 0, level: 1, inventory:["Bow", "Arrows", "Health potion"]},
            {name:"Frodo", classType:"thief", hp:150, strength:40,  magic:50, stamina: 100, xp: 0, level: 1, inventory:["Dagger", "Ring of Invisibility", "Health potion"]},
            {name:"Gimli", classType:"dwarf", hp:220, strength:90,  magic:10, stamina: 100, xp: 0, level: 1, inventory:["Axe", "Shield", "Health potion"]},
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
            {name: "Shire", description: "A peaceful place with rolling hills and hobbits."},
            {name: "Misty Mountains", description: "A treacherous mountain range with hidden dangers."},
            {name: "Mordor", description: "A dark land filled with orcs and evil."},
            {name: "Rivendell", description: "An elven sanctuary with healing powers."},
            {name: "Isengard", description: "A tower of Saruman, filled with dark magic."}
        ]
    }

}