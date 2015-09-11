/// <reference path="CharacterPosition.ts" />
/// <reference path="CharacterStatus.ts" />
/// <reference path="CharacterEquipment.ts" />
/// <reference path="CharacterActions.ts" />

class Character {

	_id: string;
	team: number;

	name: string;
	xp: number;
	jxp: number;
	level: number;

	//charge time
	ct: number;
	
	//base statistics
	stat: CharacterStatus;

	//calculated statistics
	cstat: CharacterStatus;

	//location on map, and direction facing
	position: CharacterPosition;
	
	//the status effects influenced by
	affected: Effect[];
	
	equipment: CharacterEquipment;

	actions: CharacterActions;

	inventory: Item[];
	
	jobs: any[];

	constructor(c) {
		var tmpPos = c.stats.state.position;
		//these assignments will need to be re-written
		// when we have decided how to load characters in
		this._id = c._id;
		this.team = c.team;

		this.name = c.stats.name;
		this.xp = c.stats.exp;
		this.jxp = c.stats.jxp;
		this.level = c.stats.level;

		this.ct = 0;

		this.stat = new CharacterStatus(c.stats.base);
		this.cstat = new CharacterStatus(c.stats.state);

		this.position = 
			new CharacterPosition(tmpPos.x, tmpPos.y, tmpPos.z, Direction.north);

		this.equipment = new CharacterEquipment(c.equipment);

		this.actions = new CharacterActions();

	}
}