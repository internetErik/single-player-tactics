class CharacterEquipment {
	rightHand: any;
	leftHand: any;
	head: any;
	body: any;
	accessory: any;

	static equipItem = function (item: Item, location: EquipableLocation): boolean { 
		return false;
	};

	static isWeapon = function(itemData) {
		return (itemData.itemType === ItemType.weapon)
	}

	constructor(equipment) {
		for(let key in equipment)
			if (equipment[key] !== null) {
				
				let item = Item.getItemById(equipment[key]);

				if (item !== null) {
					// if (location === 'rightHand')
					if(cmpEnum(key, EquipableLocation.rightHand, EquipableLocation))
						this.rightHand = (CharacterEquipment.isWeapon(item)) ?
							new Weapon(item) :
							new Shield(item);

					if (cmpEnum(key, EquipableLocation.leftHand, EquipableLocation))
						this.leftHand = (CharacterEquipment.isWeapon(item)) ?
							new Weapon(item) :
							new Shield(item);

					if (cmpEnum(key, EquipableLocation.head, EquipableLocation))
						this.head = new Helmet(item);

					if (cmpEnum(key, EquipableLocation.body, EquipableLocation))
						this.body = new Armor(item);

					if (cmpEnum(key, EquipableLocation.accessory, EquipableLocation))
						this.accessory = new Accessory(item);
				}
			}
	}
}