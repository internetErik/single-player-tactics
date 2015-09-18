enum Direction { north, east, south, west };

enum ItemType { weapon, shield, helmet, armor, accessory, consumable };
enum WeaponType { sword, mace, staff, pole, polearm, bow, crossbow, lance };
enum EquipableLocation { rightHand, leftHand, head, body, accessory };
enum DamageType { physical, magical };
enum RangeType { lineOfSight, arc };

enum GroupType { };

function cmpEnum(a, b, en) {
	if (typeof a === typeof b)
		return a === b;
	else if (typeof a === 'number')
		return a === en[b];
	else
		return en[a] === b;
}