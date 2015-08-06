module GameHelp {

	/**
	 * Checks to see if the player has acted and moved
	 *
	 * 'Over' may not be the best word here
	 * 
	 * @return {boolean} if turn is over
	 */
	export function turnOver(): boolean {
		//should this be on the Turn class? should there be a Turn class?
		return (moved && acted);
	}

}