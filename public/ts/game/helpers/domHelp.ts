module DomHelp {

	/**
	 * given an x and y position, get the cell on the map
	 * 
	 * @param {number} x coordinate
	 * @param {number} y coordinate
	 */
	export function getMapCell($rows, x:number, y:number) {
		return $( $( $rows[y] ).children('.map-cell')[x] );
	}

}