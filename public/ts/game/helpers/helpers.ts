// big ass file for helpers.
// should be refactored into smaller file


/**
 * given an x and y position, get the cell on the map
 * 
 * @param {number} x coordinate
 * @param {number} y coordinate
 */
function getMapCell(x:number, y:number) {
	//$rows is a global
	return $( $( $rows[y] ).children('.map-cell')[x] );
}

/**
 * Advance all things that have a turn according to their speed.
 * If anyone gets turn >= 100, set currentTurn to them
 */
function advanceTime(characters) {
	characters.forEach(function(c) {
		c.stats.state.turn += c.stats.state.speed;
		if (c.stats.state.hp > 0 && c.stats.state.turn >= 100)
			currentTurn = c;
	});
}

/**
 * This checks to see if a cell is uninhabited and exists
 * 
 * @param  {jQuery object}  $cell the cell that we are checking - may be null
 * @return {boolean}       True means that this is a safe cell to move to
 */
function moveableMapCell($cell):boolean {
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
function attackableMapCell($cell):boolean {
	//does the cell exist?
	if(!$cell || $cell.length === 0)
		return false;

	//does the cell have the attackable class?
	if (!$cell.hasClass('map-cell_attackable'))
		return false;

	return true;
}