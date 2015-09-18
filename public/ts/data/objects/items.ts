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

//mock database
var items = [
	 /////////////
	 // Swords
	 /////////////
	 {
	 	_id: 'eae994d1-edc8-4c70-92e0-901f45b6ad4d',
	 	hands: 1,
	 	name: 'Longsword',
	 	itemType: ItemType.weapon,
		weaponType: WeaponType.sword,
		damageType: DamageType.physical,
	 	rangeType: RangeType.lineOfSight,
	 	effect: function(agent, patient){
	 		return -1*(agent.cstat.pa + roll(1,10));
	 	},
	 	range: {
	 		min: 1,
	 		max: 1,
	 		vertical: 3
	 	},
		areaOfEffect: 1
	 },
	 /////////////
	 // Polearms
	 /////////////
	 {
	 	_id: '9dc7d530-7f05-40c3-bcc9-aee3701c257e',
	 	hands: 2,
	 	name: 'Lance',
		itemType: ItemType.weapon,
		weaponType: WeaponType.polearm,
		damageType: DamageType.physical,
		rangeType: RangeType.lineOfSight,
		effect: function(agent, patient){
	 		return -1*(agent.cstat.pa + roll(1,10));
	 	},
		range: {
		  min: 1,
		  max: 2,
		  vertical: 6
		},
		areaOfEffect: 1
	 },
	 /////////////
	 // Bows
	 /////////////
	{
		_id: '2b7bda18-4f7a-4c19-8079-83d907d5c413',
		name: 'Windslasher',
		itemType: ItemType.weapon,
		weaponType: WeaponType.bow,
		damageType: DamageType.physical,
		rangeType: RangeType.arc,
		hands: 2,
		effect: function(agent, patient){
		 		return -1*(agent.cstat.pa + roll(1,8));
		},
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
	},
	 /////////////
	 // Shields
	 /////////////
	 {
	 	_id: '4e01c5b2-9023-4d3d-b25d-7c017567eaa7',
	 	name: 'Buckler',
	 	itemType: ItemType.shield
	 }
];