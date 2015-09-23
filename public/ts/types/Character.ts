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
	position: Topos;
	
	//the status effects influenced by
	affected: any[];
	
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
			new Topos(tmpPos.x, tmpPos.y, tmpPos.z, Direction.north);

		this.equipment = new CharacterEquipment(c.equipment);

		this.actions = new CharacterActions();

	}

	getAttackEffect()
		:(agent: Character, patient: Character) => any {
		var rightWeapon = false,
			leftWeapon = false,
			rfn,
			lfn; 

		if(this.equipment.rightHand){
			rightWeapon = cmpEnum(this.equipment.rightHand.itemType, ItemType.weapon, ItemType),
			rfn = this.equipment.rightHand.effect;
		}
		
		if(this.equipment.leftHand){
			leftWeapon = cmpEnum(this.equipment.leftHand.itemType, ItemType.weapon, ItemType);
			lfn = this.equipment.leftHand.effect;
		}

		if (rightWeapon && leftWeapon)
			return function(agent: Character, patient: Character) {
				return rfn() + lfn(); 
			}
		else if (rightWeapon)
			return rfn;
		else if (leftWeapon)
			return lfn;
		else
			return function(agent: Character, patient: Character) {
				return -1 * (agent.cstat.pa + roll(1, 4));
			}
	}

	getWeapon() {
		var rightWeapon = null,
			leftWeapon = null;

		if (this.equipment.rightHand && cmpEnum(this.equipment.rightHand.itemType, ItemType.weapon, ItemType))
			return this.equipment.rightHand;

		if (this.equipment.leftHand && cmpEnum(this.equipment.leftHand.itemType, ItemType.weapon, ItemType))
			return this.equipment.leftHand;
	}
}