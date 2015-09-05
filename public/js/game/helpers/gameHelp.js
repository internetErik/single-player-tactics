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
        //moved and acted are global variables in game.ts
        //	I don't like this
        return (moved && acted);
    }
    GameHelp.turnOver = turnOver;
    //psuedo code
    function attackableSpace(agent, action, map) {
        var x, y, z;
        //for each position in the map check if it's a valid target
    }
    GameHelp.attackableSpace = attackableSpace;
    function roll(dice, sides) {
        return (dice === 0 || sides === 0) ?
            0 :
            Array.apply(dice, Array(dice))
                .map(function () {
                return Math.ceil(Math.random() * sides);
            })
                .reduce(function (p, c, n) {
                return p + c;
            }, 0);
    }
    GameHelp.roll = roll;
})(GameHelp || (GameHelp = {}));
