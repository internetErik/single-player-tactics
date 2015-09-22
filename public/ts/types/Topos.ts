//Topos = greek for place
//Wish I could call it location or position, but these conflict with typescript definitions
class Topos {
	x: number;
	y: number;
	z: number;
	dir: Direction;

	constructor(x: number, y: number, z: number, dir: Direction){
		this.x = x;
		this.y = y;
		this.z = z;
		this.dir = dir;
	}
}