var DomHelp;
(function (DomHelp) {
    /**
     * given an x and y position, get the cell on the map
     *
     * @param {number} $rows the cache of rows to look in
     * @param {number} x coordinate
     * @param {number} y coordinate
     * @param {number} z coordinate
     */
    function getMapCell($rows, x, y, z) {
        var $row = $rows.filter('[data-y=' + y + '][data-z=' + z + ']');
        if ($row.length > 0)
            return $row.children('.map-cell[data-x=' + x + ']');
        else
            console.error("tried to look up spot on map that doesn't exist. (" + x + ", " + y + ", " + z + ")");
    }
    DomHelp.getMapCell = getMapCell;
    /**
     * This checks to see if a cell is uninhabited and exists
     *
     * @param  {jQuery object}  $cell the cell that we are checking - may be null
     * @return {boolean}       True means that this is a safe cell to move to
     */
    function moveableMapCell($cell) {
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
    DomHelp.moveableMapCell = moveableMapCell;
    /**
     * Determines if a cell is a valid target
     *
     * @param  {[type]}  $cell [description]
     * @return {boolean}       [description]
     */
    function attackableMapCell($cell) {
        //does the cell exist?
        if (!$cell || $cell.length === 0)
            return false;
        //does the cell have the attackable class?
        if (!$cell.hasClass('map-cell_attackable'))
            return false;
        return true;
    }
    DomHelp.attackableMapCell = attackableMapCell;
})(DomHelp || (DomHelp = {}));
