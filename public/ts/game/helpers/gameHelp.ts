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

	/**
	 * This checks to see if a cell is uninhabited and exists
	 * 
	 * @param  {jQuery object}  $cell the cell that we are checking - may be null
	 * @return {boolean}       True means that this is a safe cell to move to
	 */
	export function moveableMapCell($cell):boolean {
		//if this position is illegal, or there is someone there return false
		if (!$cell || $cell.length === 0)
			return false;

		//does the cell have the moveable class?
		if (!$cell.hasClass('map-cell_moveable'))
			return false;

		//does the cell have a character in it already?
		if ($cell.children('.character').length > 0)
			return false;

		return true;
	}

	/**
	 * Determines if a cell is a valid target
	 * 
	 * @param  {[type]}  $cell [description]
	 * @return {boolean}       [description]
	 */
	export function attackableMapCell($cell):boolean {
		//does the cell exist?
		if(!$cell || $cell.length === 0)
			return false;

		//does the cell have the attackable class?
		if (!$cell.hasClass('map-cell_attackable'))
			return false;

		return true;
	}

}