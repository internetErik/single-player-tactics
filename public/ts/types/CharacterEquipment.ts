class CharacterEquipment {
	rightHand: Item;
	leftHand: Item;
	head: Item;
	body: Item;
	accessory: Item;

	equipItem = function(item: Item, location: EquipableLocation): boolean { 
		return false;
	};

	constructor() {}
}