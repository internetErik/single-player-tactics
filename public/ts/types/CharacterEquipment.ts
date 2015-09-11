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

				//we are doing this so we can compare without getting an typescript error
				let location: string = EquipableLocation[EquipableLocation[key]];

				if (item !== null) {
					if (location === 'rightHand')
						this.rightHand = (CharacterEquipment.isWeapon(item)) ?
							new Weapon(item) :
							new Shield(item);

					if (location === 'leftHand')
						this.leftHand = (CharacterEquipment.isWeapon(item)) ?
							new Weapon(item) :
							new Shield(item);

					if (location === 'head')
						this.head = new Helmet(item);

					if (location === 'body')
						this.body = new Armor(item);

					if (location === 'accessory')
						this.accessory = new Accessory(item);
				}
			}
	}
}