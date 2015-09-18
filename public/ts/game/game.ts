/// <reference path="../../tsd/typings/tsd.d.ts" />
/// <reference path="../types/types.ts" />
/// <reference path="../data/maps/map.ts" />
/// <reference path="../data/objects/items.ts" />
/// <reference path="../data/characters/characters.ts" />
/// <reference path="helpers/EffectHelper.ts" />
/// <reference path="helpers/DomHelper.ts" />
/// <reference path="helpers/EntityHelper.ts" />
/// <reference path="helpers/GameHelper.ts" />
/// <reference path="ui/ui.ts" />

/**
 * This represents the character that is currently active
 * @type {Character}
 */
var currentTurn:Character = null;
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


module Game {

	var _instance: Game;
	
	/**
	 * Returns the instance of this singleton module
	 */
	export function getInstance(): Game {
        return _instance;
    }


	/**
	 * These not used yet.  Neet to be refactored in
	 */
	var activeTurn;
	var map: any[];
	//end unused fields

	class Game {
        gameOn: boolean;
        team1Alive: boolean;
        team2Alive: boolean;
        characters: Character[];

        constructor() {
			// See if we have already tried to initialize this.  
			// It's impossible to do, really, without code modification, so this is more of a note for future developers
			if (_instance)
				throw new Error("Error: Instantiation failed: Use Game.getInstance() instead of new.");

			//assign properties on to our _instance
			this.gameOn = true;
			this.team1Alive = true;
			this.team2Alive = true;
			this.characters = [];

			//extend character objects with getters
			// When characters are represented by a class we won't do this
			characters.forEach((character) =>
				this.characters.push(new Character(character))
			);

			UI.initGameUI(basicMap, this.characters);
		}



		/**
		 * This is the function that is called each time for the game loop
		 * I am using a setTimeout instead of a while loop
		 */
		gameLoop = (): void => {
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
				currentTurn = EntityHelper.advanceTime(this.characters);

			if (currentTurn)
				this.gameOn = this.isGameOn();
					
			//Put current characters name over the menu
			$('.active-character').text(currentTurn.name);		
					
			//if game still call gameLoop again
			if (this.gameOn)
				setTimeout(this.gameLoop, 1000);
			else
				UI.displayVictor(this.team1Alive, this.team2Alive);
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
		isGameOn = (): boolean => {
			this.team1Alive = false;
			this.team2Alive = false;
			this.characters.forEach((c) => {
				if (c.cstat.hp > 0)
					(c.team === 1) ?
						this.team1Alive = true :
						this.team2Alive = true;
			});

			return (this.team1Alive && this.team2Alive);
		}
	}

	/**
	 * This is the singleton instance of this class returned by this module
	 * @type {[type]}
	 */
	_instance = new Game();
}

(function(){
	var game = Game.getInstance();

	// kick off the game loop
	game.gameLoop();
})();