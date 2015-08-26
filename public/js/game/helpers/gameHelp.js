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
})(GameHelp || (GameHelp = {}));
