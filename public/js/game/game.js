/// <reference path="../../tsd/typings/tsd.d.ts" />
/// <reference path="data/maps/map.ts" />
/// <reference path="data/characters/characters.ts" />
/// <reference path="helpers/domHelp.ts" />
/// <reference path="helpers/entityHelp.ts" />
/// <reference path="helpers/gameHelp.ts" />
/// <reference path="ui/ui.ts" />
/**
 * This represents the character that is currently active
 * @type {Character}
 */
var currentTurn = null;
/**
 * Keeps track of the kind of action being performed by active character
 * @type {String} in the future, perhaps, enum?
 */
var turnMode = null;
/**
 * Has the active character moved?
 * @type {Boolean}
 */
var moved = false;
/**
 * Has the active character acted?
 * @type {Boolean}
 */
var acted = false;
var Game;
(function (Game_1) {
    /**
     * This is the singleton instance of this class returned by this module
     * @type {[type]}
     */
    var _instance = new Game();
    /**
     * Returns the instance of this singleton module
     */
    function getInstance() {
        return _instance;
    }
    Game_1.getInstance = getInstance;
    /**
     * Flag that tells us if the game is still going
     * @type {Boolean}
     */
    var gameOn;
    /**
     * These track if the teams are dead yet
     * @type {Boolean}
     */
    var team1Alive;
    var team2Alive;
    /**
     * These not used yet.  Neet to be refactored in
     */
    var activeTurn;
    var map;
    // var characters: Array<any>;
    //end unused fields
    function Game() {
        // See if we have already tried to initialize this.  
        // It's impossible to do, really, without code modification, so this is more of a note for future developers
        if (_instance) {
            throw new Error("Error: Instantiation failed: Use Game.getInstance() instead of new.");
        }
        //assign properties on to our _instance
        this.gameOn = true;
        this.team1Alive = true;
        this.team2Alive = true;
        this.gameLoop = gameLoop;
        //basicMap and characters are hardcoded data
        initGameUI(basicMap, characters);
    }
    /**
     * This is the function that is called each time for the game loop
     * I am using a setTimeout instead of a while loop
     */
    function gameLoop() {
        //
        // When there is a current move, we will just fall 
        // through this function, that means that if the user 
        // is putzing around and entering in and out of menus 
        // as long as they don't end their turn, it will
        // still have their turn 
        //
        //this loop runs until we assign something to the
        //character/event with the current turn
        while (!currentTurn)
            currentTurn = EntityHelp.advanceTime(characters);
        if (currentTurn)
            gameOn = isGameOn(characters);
        //Put current characters name over the menu
        $('.active-character').text(currentTurn.stats.name);
        //if game still call gameLoop again
        if (gameOn)
            setTimeout(gameLoop, 1000);
        else
            displayVictor(_instance.team1Alive, _instance.team2Alive);
    }
    /**
     * Decides if the game is still going
     *
     * set both teams to dead (teamXAlive = false)
     * loop through characters.
     * 	if they are alive, set their team to true
     *
     * @return {boolean} the new value of gameOn
     */
    function isGameOn(characters) {
        _instance.team1Alive = false;
        _instance.team2Alive = false;
        characters.forEach(function (c) {
            if (c.stats.state.hp > 0)
                (c.team === 1) ?
                    _instance.team1Alive = true :
                    _instance.team2Alive = true;
        });
        return (_instance.team1Alive && _instance.team2Alive);
    }
})(Game || (Game = {}));
(function () {
    var game = Game.getInstance();
    // kick off the game loop
    game.gameLoop();
})();
