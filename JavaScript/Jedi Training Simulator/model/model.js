const model = {
    app: {
        currentCharacterId: null,
        lastRestTime: 0,
        isSparring: false,
        playerHealth: 0,
        opponentHealth: 0, 
        currentTurn: 0,
        playerDefending: false,
        opponentDefending: false,
    },
    input: {},
    data: {
        characters: [
            {
                id: 0,
                name: 'Aryn Vez',
                forceStrength: 10,
                saberSkill: 12,
                wisdom: 16,
                isLightSide: true,
                master: "Obi-Wan Kenobi",
                level: 1,
                xp: 0,
                xpToNextLevel: 250,
                stamina: 100,
                image: "./imgs/padawan/Padawan Aryn.png",
                lightSide: 65,
                darkSide: 35,
                hp: 250,
            },
            {
                id: 1,
                name: 'Kael Zorath',
                forceStrength: 8,
                saberSkill: 15,
                wisdom: 12,
                isLightSide: false,
                master: "Anakin Skywalker",
                level: 1,
                xp: 0,
                xpToNextLevel: 250,
                stamina: 100,
                image: "./imgs/padawan/padawan Kael.png",
                lightSide: 35,
                darkSide: 65,
                hp: 250,
            }
        ],
        locations: [
            { name: "Tatooine", event: "Found a hidden Jedi holocron!", xp: 30, staminaCost: 10 },
            { name: "Coruscant", event: "Trained with a Jedi Master!", xp: 50, staminaCost: 15 },
            { name: "Mustafar", event: "Faced a Dark Side vision!", xp: 40, staminaCost: 20 }
        ],
        missions: [
            { id: 1, name: "Master the Light", requirement: { stat: "lightSide", value: 80 }, reward: { xp: 100 }, completed: false },
            { id: 2, name: "Saber Mastery", requirement: { stat: "saberSkill", value: 50 }, reward: { xp: 75 }, completed: false },
            { id: 3, name: "Endurance Trainee", requirement: { stat: "stamina", value: 150 }, reward: { xp: 100 }, completed: false },
            { id: 4, name: "Endurance Proffesional", requirement: { stat: "stamina", value: 200 }, reward: { xp: 150 }, completed: false },
            { id: 5, name: "Endurance Master", requirement: { stat: "stamina", value: 250 }, reward: { xp: 200 }, completed: false },
        ]
    }
};