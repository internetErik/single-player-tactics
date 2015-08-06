var GameHelp;
(function (GameHelp) {
    /**
     * Checks to see if the player has acted and moved
     *
     * 'Over' may not be the best word here
     *
     * @return {boolean} if turn is over
     */
    function turnOver() {
        //should this be on the Turn class? should there be a Turn class?
        return (moved && acted);
    }
    GameHelp.turnOver = turnOver;
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
    GameHelp.moveableMapCell = moveableMapCell;
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
    GameHelp.attackableMapCell = attackableMapCell;
})(GameHelp || (GameHelp = {}));
