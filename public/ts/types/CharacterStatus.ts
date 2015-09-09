class CharacterStatus {
	hp: number; //base changes as you level up
	mp: number;
	pa: number;
	ma: number;
	move: number;
	jump: number;
	speed: number;
	brave: number;
	faith: number;

	constructor(stats){
		this.hp = stats.hp;
		this.mp = stats.mp;
		this.pa = stats.pa;
		this.ma = stats.ma;
		this.move = stats.move;
		this.jump = stats.jump;
		this.speed = stats.speed;
		this.brave = stats.brave;
		this.faith = stats.faith;
	}
}