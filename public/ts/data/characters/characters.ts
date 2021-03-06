class Entity {}

//has a turn
interface ITimely {
	/**
	 * @return {Number} the value of the entity's charge/turn
	 */
	getTurn(): Number;
}

interface IAlive {} //has hp/mp
interface ILocated {} //has a location on map
interface IMoveable {} //can change position on map
interface IDirected {} //faces a direction

interface IEquipment {} //is a piece of equipment


var characters = [
	{
		_id: '01e3d7cb-98d1-40fa-a294-011a9d9c44ce',
		team: 1,
		stats: {
			name: 'Erik',
			exp: 0,
			jxp: 0,
			level: 1,
			base : {
				brave: 70,
				faith: 70,
				hp: 40, //base changes as you level up
				mp: 11,
				pa: 6,
				ma: 6,
				move: 3,
				jump: 2,
				defense: 1,
				damage: -1,
				speed: 20
			},
			state: {
				brave: 70,
				faith: 70,
				hp: 40, //changes depending on the job you have
				mp: 11,
				pa: 6,
				ma: 6,
				move: 3,
				jump: 2,
				defense: 4,
				damage: -13,
				speed: 20,
				//below here, there is no 'base stat', but only computed
    			//perhaps this could be a seperate section?
				
				//current position in the field
				position: {
					x: 5,
					y: 0,
					z: 2,
					d: 'n' //the direction being faced
				},
				//this charges up to 100 by speed, then you get a turn
				turn: 20,
				effects: [
					/* just some sample effect
						{
     						_id: '',
     						name: 'Protect',
     						defense: 5,
     						turns: 4
     					},
     					{
     						_id: '',
     						name: 'Poison',
     						defense: 5,
     						dot: 1,
     						turns: -1
     					},
     				*/
				]
			}	
		},
		appearance: {
			height: {
				meters: 1,
				cm: 93
			},
			weight: {},
			face: {
				eyes: 'blue',
			},
			hair: {},
			arms: {},
			legs: {},
			back: {}
		},
		equipment: {
			rightHand: 'eae994d1-edc8-4c70-92e0-901f45b6ad4d',
			leftHand: null,
			head: null,
			body: null,
			accessory: null
		},
		actions: {
			//This should show in the action menu
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
		_id: '78a5ae45-5fbb-4edc-8c96-01b031b29d8e',
		team: 1,
		stats: {
			name: 'Craig',
			exp: 0,
			jxp: 0,
			level: 1,
			base : {
				brave: 70,
				faith: 70,
				hp: 40, //base changes as you level up
				mp: 11,
				pa: 6,
				ma: 6,
				move: 3,
				jump: 2,
				defense: 1,
				damage: -1,
				speed: 20
			},
			state: {
				brave: 70,
				faith: 70,
				hp: 40, //changes depending on the job you have
				mp: 11,
				pa: 6,
				ma: 6,
				move: 3,
				jump: 2,
				defense: 4,
				damage: -13,
				speed: 20,
				//below here, there is no 'base stat', but only computed
    			//perhaps this could be a seperate section?
				
				//current position in the field
				position: {
					x: 0,
					y: 0,
					z: 0,
					d: 'n' //the direction being faced
				},
				//this charges up to 100 by speed, then you get a turn
				turn: 20,
				effects: [
					/* just some sample effect
						{
     						_id: '',
     						name: 'Protect',
     						defense: 5,
     						turns: 4
     					},
     					{
     						_id: '',
     						name: 'Poison',
     						defense: 5,
     						dot: 1,
     						turns: -1
     					},
     				*/
				]
			}	
		},
		appearance: {
			height: {
				meters: 1,
				cm: 93
			},
			weight: {},
			face: {
				eyes: 'blue',
			},
			hair: {},
			arms: {},
			legs: {},
			back: {}
		},
		equipment: {
			rightHand: 'eae994d1-edc8-4c70-92e0-901f45b6ad4d',
			leftHand: null,
			head: null,
			body: null,
			accessory: null
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
		_id: '573c8480-63a5-4eec-91b1-db010795635c',
		team: 2,
		stats: {
			name: 'Leibniz',
			exp: 0,
			jxp: 0,
			level: 1,
			base : {
				brave: 70,
				faith: 70,
				hp: 40, //base changes as you level up
				mp: 11,
				pa: 6,
				ma: 6,
				move: 3,
				jump: 2,
				defense: 1,
				damage: -1,
				speed: 20
			},
			state: {
				brave: 70,
				faith: 70,
				hp: 40, //changes depending on the job you have
				mp: 11,
				pa: 6,
				ma: 6,
				move: 3,
				jump: 2,
				defense: 4,
				damage: -13,
				speed: 20,
				//below here, there is no 'base stat', but only computed
    			//perhaps this could be a seperate section?
				
				//current position in the field
				position: {
					x: 5,
					y: 9,
					z: 2,
					d: 'n' //enum? the direction being faced
				},
				//this charges up to 100 by speed, then you get a turn
				turn: 0,
				effects: [
					/* just some sample effect
						{
     						_id: '',
     						name: 'Protect',
     						defense: 5,
     						turns: 4
     					},
     					{
     						_id: '',
     						name: 'Poison',
     						defense: 5,
     						dot: 1,
     						turns: -1
     					},
     				*/
				]
			}	
		},
		appearance: {
			height: {
				meters: 1,
				cm: 93
			},
			weight: {},
			face: {
				eyes: 'blue',
			},
			hair: {},
			arms: {},
			legs: {},
			back: {}
		},
		equipment: {
			rightHand: 'eae994d1-edc8-4c70-92e0-901f45b6ad4d',
			leftHand: null,
			head: null,
			body: null,
			accessory: null
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
		_id: '891cc14f-ea72-46a0-9333-7576d9b5b8cb',
		team: 2,
		stats: {
			name: 'Spinoza',
			exp: 0,
			jxp: 0,
			level: 1,
			base : {
				brave: 70,
				faith: 70,
				hp: 40, //base changes as you level up
				mp: 11,
				pa: 6,
				ma: 6,
				move: 3,
				jump: 2,
				defense: 1,
				damage: -1,
				speed: 20
			},
			state: {
				brave: 70,
				faith: 70,
				hp: 40, //changes depending on the job you have
				mp: 11,
				pa: 6,
				ma: 6,
				move: 3,
				jump: 2,
				defense: 4,
				damage: -13,
				speed: 20,
				//below here, there is no 'base stat', but only computed
    			//perhaps this could be a seperate section?
				
				//current position in the field
				position: {
					x: 4,
					y: 9,
					z: 2,
					d: 'n' //enum? the direction being faced
				},
				//this charges up to 100 by speed, then you get a turn
				turn: 0,
				effects: [
					/* just some sample effect
						{
     						_id: '',
     						name: 'Protect',
     						defense: 5,
     						turns: 4
     					},
     					{
     						_id: '',
     						name: 'Poison',
     						defense: 5,
     						dot: 1,
     						turns: -1
     					},
     				*/
				]
			}	
		},
		appearance: {
			height: {
				meters: 1,
				cm: 93
			},
			weight: {},
			face: {
				eyes: 'blue',
			},
			hair: {},
			arms: {},
			legs: {},
			back: {}
		},
		equipment: {
			rightHand: 'eae994d1-edc8-4c70-92e0-901f45b6ad4d',
			leftHand: null,
			head: null,
			body: null,
			accessory: null
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