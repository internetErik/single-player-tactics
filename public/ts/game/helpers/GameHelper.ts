module GameHelper {

	/**
	 * Checks to see if the player has acted and moved
	 *
	 * 'Over' may not be the best word here
	 * 
	 * @return {boolean} if turn is over
	 */
	export function turnOver(): boolean {
		//should this be on the Turn class? should there be a Turn class?
		//moved and acted are global variables in game.ts
		//	I don't like this
		return (moved && acted);
	}

	//psuedo code
	export function attackableSpace(agent, action, map) {
		var x, y, z;

		//for each position in the map check if it's a valid target
	}


	export function roll(dice: number, sides: number): number {
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

}