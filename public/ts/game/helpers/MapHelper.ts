module MapHelper {
	/**
	 * buildBasicRange
	 *
	 * This can be used for weapons or movement as long as they are in
	 * the normal diamond shape
	 *
	 * This function starts of a chain of functions that compute recursively
	 * 
	 * @param {Topos} 	position    The starting position on the map
	 * @param {number}  range 			The max range to calculate for
	 * @param {any}  		map 				The map we are calculating on
	 * @return {Topos[]} items on the map that are within basic range
	 * 
	 */
	export function buildBasicRange(position: Topos, range: number, map: any): Topos[] {
		//in combination with the Direction enum, we have an easy way to move around the grid
		var spots = [],
			x = position.x,
			y = position.y,
			z = position.z;

		if (!map.grid[z][y][x] || !map.grid[z][y][x]._id) {
			console.error("Start position is not on the map");
			return [];
		}

		map.grid.forEach(function(level, z) {
			if (level.length > 0) {
				let p = new Topos(position.x, position.y, z, position.dir);
				//absolutely no intended nazi symbolism in this algorithm
				spots = spots.concat(
										traverseHorizontalFirst(1, 1, p, range, map)
									, traverseVerticalFirst(-1, 1, p, range, map)
									, traverseHorizontalFirst(-1, -1, p, range, map)
									, traverseVerticalFirst(1, -1, p, range, map)
									);
			}
		});

		return spots;
	}

	/**
	 * traverseHorizontalFirst
	 * 
	 * Recusively searches for available spots on the horizontal axis, 
	 * and kicks off recursive searches for vertical spots
	 * 
	 * @param {number} hor   The direction and amount we are moving horizontally
	 * @param {number} vert  The direction and amount we are moving vertically
	 * @param {Topos}  p     The starting position on the map
	 * @param {number} range The max range to calculate for
	 * @param {any}    map   The map we are calculating on
	 * @return {Topos[]} items on the map that are within basic range
	 */
	function traverseHorizontalFirst(hor: number, vert: number, p: Topos, range: number, map: any): Topos[] {
		var spots = []; //create accumulator

		p = new Topos(p.x + hor, p.y, p.z, p.dir);
		
		//handle base cases
		if (range > 0 && p.x >= 0 && p.x < map.size.x) {
			if (map.grid[p.z][p.y][p.x]._id)
				spots.push(p);
			spots = spots.concat(
														traverseHorizontalFirst(hor, vert, p, range - 1, map)
													, traverseVertical(vert, p, range - 1, map));
		}

		return spots;
	}

	/**
	 * traverseVerticalFirst
	 * 
	 * Recusively searches for available spots on the vertical axis, 
	 * and kicks off recursive searches for horizontal spots
	 * 
	 * @param {number} hor   The direction and amount we are moving horizontaly
	 * @param {number} vert  The direction and amount we are moving vertically
	 * @param {Topos}  p     The starting position on the map
	 * @param {number} range The max range to calculate for
	 * @param {any}    map   The map we are calculating on
	 * @return {Topos[]} items on the map that are within basic range
	 */
	function traverseVerticalFirst(hor: number, vert: number, p: Topos, range: number, map: any): Topos[] {
		var spots = []; //create accumulator

		p = new Topos(p.x, p.y + vert, p.z, p.dir);
		
		//handle base cases
		if (range > 0 && p.y >= 0 && p.y < map.size.y) {
			if (map.grid[p.z][p.y][p.x]._id)
				spots.push(p);
			spots = spots.concat(
														traverseVerticalFirst(hor, vert, p, range - 1, map)
													, traverseHorizontal(hor, p, range - 1, map));
		}

		return spots;
	}

	/**
	 * traverseHorizontal
	 * 
	 * Recusively searches for available spots on the horizontal axis
	 * 
	 * @param {number} hor  The direction and amount we are moving horizontally
	 * @param {Topos}  p     The starting position on the map
	 * @param {number} range The max range to calculate for
	 * @param {any}    map   The map we are calculating on
	 * @return {Topos[]} items on the map that are within basic range
	 */
	function traverseHorizontal(hor: number, p: Topos, range: number, map: any): Topos[] {
			var spots = []; //create accumulator

			p = new Topos(p.x + hor, p.y, p.z, p.dir);
		
			//handle base cases
			if (range > 0 && p.x >= 0 && p.x < map.size.x) {
					if (map.grid[p.z][p.y][p.x]._id)
							spots.push(p);
					spots = spots.concat(traverseHorizontal(hor, p, range - 1, map));
			}

			return spots;
	}

	/**
	 * traverseVertical
	 * 
	 * Recusively searches for available spots on the vertical axis
	 * 
	 * @param {number} vert  The direction and amount we are moving vertically
	 * @param {Topos}  p     The starting position on the map
	 * @param {number} range The max range to calculate for
	 * @param {any}    map   The map we are calculating on
	 * @return {Topos[]} items on the map that are within basic range
	 */
	function traverseVertical(vert: number, p: Topos, range: number, map: any): Topos[] {
		var spots = []; //create accumulator

		//update position
		p = new Topos(p.x, p.y + vert, p.z, p.dir);
		
		//handle base cases
		if (range > 0 && p.y >= 0 && p.y < map.size.y) {
			if (map.grid[p.z][p.y][p.x]._id)
				spots.push(p);
			spots = spots.concat(traverseVertical(vert, p, range - 1, map));
		}

		return spots;
	}

}