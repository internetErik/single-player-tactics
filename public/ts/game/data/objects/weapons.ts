function roll(dice: number, sides: number): number {
	return (dice === 0 || sides === 0) ? 
			0 : 
			Array.apply(dice, Array(dice))
			.map(function() { 
				return Math.ceil(Math.random() * sides);
			})
			.reduce(function(p,c,n){
				return p + c;
			}, 0);
}
var weapons = [
	 /////////////
	 // Sword
	 /////////////
	 {
	 	_id: 'eae994d1-edc8-4c70-92e0-901f45b6ad4d',
	 	hands: 1,
	 	name: 'Longsword',
	 	itemType: 'sword',
		effectType: 'physical',
	 	effect: function(agent, patient){
	 		return -1*(agent.stats.state.pa + roll(1,10));
	 	},
	 	rangeType: 'line-of-sight',
	 	range: {
	 		min: 1,
	 		max: 1,
	 		vertical: 3
	 	},
		areaOfEffect: 1
	 },
	 /////////////
	 // Lance
	 // 
	 /////////////
	 {
	 	_id: '9dc7d530-7f05-40c3-bcc9-aee3701c257e',
	 	hands: 2,
	 	name: 'Lance',
	 	itemType: 'lance',
		effectType: 'physical',
		effect: function(agent, patient){
	 		return -1*(agent.stats.state.pa + roll(1,10));
	 	},
		rangeType: 'line-of-sight',
		range: {
		  min: 1,
		  max: 2,
		  vertical: 6
		},
		areaOfEffect: 1
	 },
	 /////////////
	 // Bow
	 /////////////
	{
		_id: '2b7bda18-4f7a-4c19-8079-83d907d5c413',
		hands: 2,
		name: 'Windslasher',
		itemType: 'bow',
		effectType: 'physical',
		effect: function(agent, patient){
		 		return -1*(agent.stats.state.pa + roll(1,8));
		},
		rangeType: 'arc',
		range: function(o, t) {
			//o(=origin) and t(=target) are {x:number,y:number,z:number}
			var range,
				baseRange = 6,
				heightDiff = (o.z - t.z); 
	    	
			//if target is higher than it has less range,
			//if lower is has more range
			range = baseRange + (heightDiff / 3);
		},
		areaOfEffect: 1
	}
];