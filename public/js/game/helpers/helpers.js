var DomHelp;
(function (DomHelp) {
    /**
     * given an x and y position, get the cell on the map
     *
     * @param {number} x coordinate
     * @param {number} y coordinate
     */
    function getMapCell($rows, x, y) {
        return $($($rows[y]).children('.map-cell')[x]);
    }
})(DomHelp || (DomHelp = {}));
var EntityHelp;
(function (EntityHelp) {
    /**
     * Advance all things that have a turn according to their speed.
     * If anyone gets turn >= 100, set currentTurn to them
     */
    function advanceTime(characters) {
        var currentTurn;
        characters.forEach(function (c) {
            c.stats.state.turn += c.stats.state.speed;
            if (c.stats.state.hp > 0 && c.stats.state.turn >= 100)
                currentTurn = c;
        });
        return currentTurn;
    }
    /**
     * Returns the change in health from an effect
     * @param {[type]} effect  the action being performed
     * @param {[type]} agent   the actor
     * @param {[type]} patient the target of action
     */
    function calculateHealthChange(effect, agent, patient) {
        return agent.stats.state.damage + patient.stats.state.defense;
    }
    /**
     * Returns the remaining hp of characters
     * doesn't allow a result less than 0
     *
     * @param {[type]} effect  The action being performed
     * @param {[type]} agent   The actor
     * @param {[type]} patient The target of action
     */
    function calculateRemainingHp(effect, agent, patient) {
        var hp = patient.stats.state.hp + calculateHealthChange(effect, agent, patient);
        //don't allow hp to reduce below 0
        return (hp >= 0) ? hp : 0;
    }
})(EntityHelp || (EntityHelp = {}));
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
})(GameHelp || (GameHelp = {}));
