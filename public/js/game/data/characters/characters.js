// module Character {
// 	export class Character
// 		extends Entity
// 		implements ITimely, IAlive, ILocated, IMoveable, IDirected {
// 		/**
// 		 * See ITimely
// 		 */
// 		getTurn() {
// 			return 1;
// 		}
// 	}
// }
var Entity = (function () {
    function Entity() {
    }
    return Entity;
})();
var characters = [
    {
        _id: '1',
        team: 1,
        stats: {
            name: 'Erik',
            exp: 0,
            jxp: 0,
            level: 1,
            base: {
                brave: 70,
                faith: 70,
                hp: 40,
                mp: 11,
                move: 4,
                jump: 2,
                defense: 1,
                damage: -1,
                speed: 20
            },
            state: {
                brave: 70,
                faith: 70,
                hp: 40,
                mp: 11,
                move: 4,
                jump: 2,
                defense: 4,
                damage: -13,
                speed: 20,
                //below here, there is no 'base stat', but only computed
                //perhaps this could be a seperate section?
                //current position in the field
                position: {
                    x: 5,
                    y: 1,
                    z: 0,
                    d: 'n' //the direction being faced
                },
                //this charges up to 100 by speed, then you get a turn
                turn: 20,
                effects: []
            }
        },
        appearance: {
            height: {
                meters: 1,
                cm: 93
            },
            weight: {},
            face: {
                eyes: 'blue'
            },
            hair: {},
            arms: {},
            legs: {},
            back: {}
        },
        equipment: {
            rightHand: {
                _id: '',
                name: 'Dagger',
                damage: -12,
                distance: 1,
                heightModifier: 1,
                area: 1,
                durability: 100 //0 = broken (then gets removed), 100 is max, -1 is unbreakable
            },
            leftHand: {
                _id: '',
                name: 'buckler',
                defense: 3,
                block: 15,
                durability: 100
            },
            head: {},
            body: {},
            accessory: {}
        },
        actions: {
            primary: 'Basic Skills',
            secondary: null,
            reaction: null,
            support: null,
            movement: null
        },
        jobs: [
            {
                _id: '',
                name: 'Squire',
                level: 1,
                currentJxp: 0,
                hpMultiplier: 1,
                mpMultiplier: 1,
                actionName: 'Basic Skills',
                actions: [
                    {
                        _id: '',
                        name: 'tackle',
                        learned: true,
                        jxpRequired: 50
                    }
                ],
                reactions: [],
                support: [],
                movement: []
            }
        ]
    },
    {
        _id: '2',
        team: 2,
        stats: {
            name: 'Liesl',
            exp: 0,
            jxp: 0,
            level: 1,
            base: {
                brave: 70,
                faith: 70,
                hp: 40,
                mp: 11,
                move: 4,
                jump: 2,
                defense: 1,
                damage: -1,
                speed: 20
            },
            state: {
                brave: 70,
                faith: 70,
                hp: 40,
                mp: 11,
                move: 4,
                jump: 2,
                defense: 4,
                damage: -13,
                speed: 20,
                //below here, there is no 'base stat', but only computed
                //perhaps this could be a seperate section?
                //current position in the field
                position: {
                    x: 6,
                    y: 1,
                    z: 0,
                    d: 'n' //enum? the direction being faced
                },
                //this charges up to 100 by speed, then you get a turn
                turn: 0,
                effects: []
            }
        },
        appearance: {
            height: {
                meters: 1,
                cm: 93
            },
            weight: {},
            face: {
                eyes: 'blue'
            },
            hair: {},
            arms: {},
            legs: {},
            back: {}
        },
        equipment: {
            rightHand: {
                _id: '',
                name: 'Dagger',
                damage: -12,
                distance: 1,
                heightModifier: 1,
                area: 1,
                durability: 100 //0 = broken (then gets removed), 100 is max, -1 is unbreakable
            },
            leftHand: {
                _id: '',
                name: 'buckler',
                defense: 3,
                block: 15,
                durability: 100
            },
            head: {},
            body: {},
            accessory: {}
        },
        actions: {
            primary: 'Basic Skills',
            secondary: null,
            reaction: null,
            support: null,
            movement: null
        },
        jobs: [
            {
                _id: '',
                name: 'Squire',
                level: 1,
                currentJxp: 0,
                hpMultiplier: 1,
                mpMultiplier: 1,
                actionName: 'Basic Skills',
                actions: [
                    {
                        _id: '',
                        name: 'tackle',
                        learned: true,
                        jxpRequired: 50
                    }
                ],
                reactions: [],
                support: [],
                movement: []
            }
        ]
    }
];
