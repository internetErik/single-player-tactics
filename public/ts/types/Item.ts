class Item {
	_id: string;
	name: string;
	itemType: ItemType;

	constructor(_id, name, itemType) {
		this._id = _id;
		this.name = name;
		this.itemType = itemType;
	}

	/**
	 * getItemById
	 *
	 * Method for getting an item out of the database from its id
	 * 
	 * @param  {string} _id a uuid of an item (or nothing = null)
	 * @return {any}        this will either be an object or null
	 */
	static getItemById(_id:string): any {
		var tmp = items.filter(i => (i._id === _id) ? true : false );

		return (tmp.length > 0) ? tmp[0] : null;
	}
}

class Weapon extends Item {

	weaponType: WeaponType;

	damageType: DamageType;

	rangeType: RangeType;

	effect: Effect; //value, function or object

	range: any; //value, function or object

	areaOfEffect: any;  //value, function or object

	constructor(item) {
		super(item._id, item.name, item.itemType);
		
		this.weaponType = item.weaponType;
		this.damageType = item.damageType;
		this.rangeType = item.rangeType;
		this.effect = new Effect(item.effect);
		this.range = item.range;
		this.areaOfEffect = item.areaOfEffect;
	}
}

class Shield extends Item {
	constructor(item) {
		super(item._id, item.name, item.itemType);
	}
}

class Helmet extends Item {
	constructor(item) {
		super(item._id, item.name, item.itemType);
	}
}

class Armor extends Item {
	constructor(item) {
		super(item._id, item.name, item.itemType);
	}
}

class Accessory extends Item {
	constructor(_id: string) {
		var item;
		item = Item.getItemById(_id);
		super(item._id, item.name, item.itemType);
	}
}

class Consumable extends Item {
	constructor(_id: string) {
		var item;
		item = Item.getItemById(_id);
		super(item._id, item.name, item.itemType);
	}
}