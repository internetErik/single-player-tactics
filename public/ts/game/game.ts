/// <reference path="../../tsd/typings/tsd.d.ts" />
/// <reference path="data/maps/map.ts" />
/// <reference path="data/characters/characters.ts" />
/// <reference path="helpers/helpers.ts" />
/// <reference path="ui/ui.ts" />

//stubs/ideas
class Game {

	// ToDo: consider module instead of singleton pattern
	// http://stackoverflow.com/questions/30174078/how-to-define-singleton-in-typescript
	private static _instance:Game = new Game();

	/**
	 * Flag that tells us if the game is still going
	 * @type {Boolean}
	 */
	gameOn: boolean;

	/**
	 * These track if the teams are dead yet
	 * @type {Boolean}
	 */
	team1Alive: boolean;
	team2Alive: boolean;

	/**
	 * These not used yet.  Neet to be refactored in
	 */
	activeTurn: Turn;
	map: Map;
	characters: Array<any>;
	//end unused fields

	constructor() {
        
        if(Game._instance){
            throw new Error("Error: Instantiation failed: Use Game.getInstance() instead of new.");
        }

		this.gameOn = true;
		this.team1Alive = true;
		this.team2Alive = true;
		Game._instance = this;

		initGameUI(basicMap, characters);
	}
	
	public static getInstance():Game {
        return this._instance;
    }

	public game = () => {
		this.gameLoop();
	}

	/**
	 * This is the function that is called each time for the game loop
	 * I am using a setTimeout instead of a while loop
	 */
	private gameLoop() {
		//
		// When there is a current move, we will just fall 
		// through this function, that means that if the user 
		// is putzing around and entering in and out of menus 
		// as long as they don't end their turn, it will
		// still have their turn 
		//

		//this loop runs until we assign something to the
		//character/event with the current turn
		while(!currentTurn)
			advanceTime(characters);

		if (currentTurn)
			this.gameOn = this.isGameOn(characters);
		
		//Put current characters name over the menu
		$('.active-character').text(currentTurn.stats.name);		
		
		//if game still call gameLoop again
		if (this.gameOn)
			setTimeout(this.gameLoop.bind(this), 1000);
		else
			displayVictor(this.team1Alive, this.team2Alive);
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
	private isGameOn(characters): boolean {
		this.team1Alive = false;
		this.team2Alive = false;

		characters.forEach(function(c){
			if (c.stats.state.hp > 0)
				(c.team === 1) ? 
					this.team1Alive = true : 
					this.team2Alive = true ;
		});

		return (this.team1Alive && this.team2Alive);
	}

}

class Turn {
	//turns can be events, or character turns
	turnType: string;

	constructor() {}
}


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

/**
 * function that is called when a cell is clicked on.  
 * It will route to the correct user event.
 *
 * I bind the context of the event to the function so 
 * `this` will be the cell clicked on.
 */
function cellInteraction() {
	if (turnMode === 'move') move.bind(this)();
	else if (turnMode === 'attack') attack.bind(this)();
}

/**
 * Checks to see if the player has acted and moved
 *
 * 'Over' may not be the best word here
 * 
 * @return {boolean} if turn is over
 */
function turnOver(): boolean {
	return (moved && acted);
}

/**
 * positions character and clears current turn when a movement has been
 * decided on
 */
function move() {
	//we only do something if there is a character with a turn
	if(currentTurn) {
		var x = this.getAttribute('data-x'),
			y = this.getAttribute('data-y'),
			$cell;

		$cell = getMapCell(x, y);
		
		//selected position may fail
		if(moveableMapCell($cell)) {
			currentTurn.stats.state.position.x = x;
			currentTurn.stats.state.position.y = y;
			clearCharacterInDom(currentTurn);
			positionCharacterInDom(currentTurn);
			clearMoveGrid();
			moved = true;

			if(turnOver())
				clearCurrentTurn();
		}
	}
}

/**
 * This is called when a character is attacking and has clicked on 
 * another cell.  We don't know if this cell has a target in it yet.
 */
function attack() {
	if(currentTurn) {
		var x = this.getAttribute('data-x'),
			y = this.getAttribute('data-y'),
			$cell,
			patientId,
			patient; //will be the target of action 
		
		//get effected cell
		$cell = getMapCell(x, y);

		//selected position may fail
		if(attackableMapCell($cell)) {

			//get target character
			patientId = $cell.children('.character').attr('id');
			patient = characters.reduce(function(p, c) {
				if (p) return p;
				if (c._id === patientId) return c;
			}, null);
			
			showEffectStats(currentTurn, patient);
			if (confirm("Are you sure you want to attack?")) {
				//apply effects - damage for now
				performAction(currentTurn, patient);
				clearAttackGrid();
				acted = true;

				if(turnOver())
					clearCurrentTurn();
			}
			
			clearEffectStats();
		}
	}
}

/**
 * Deals damage to a target
 *
 * ToDo: This should take an action object.  
 * 	The action object will describe the damage.
 * 
 * @param {Character} agent   The actor
 * @param {Character} patient the target
 */
function performAction(agent, patient) {
	var aDamage = agent.stats.state.damage,
		aHealth = agent.stats.state.hp,
		pHealth,
		pNewHealth;
	
	if (patient) {
		pHealth = patient.stats.state.hp;
		pNewHealth = pHealth + aDamage;
	
		//don't let health drop below 0;
		pNewHealth = (pNewHealth >= 0) ? pNewHealth : 0;

		patient.stats.state.hp = pNewHealth;
	}
}

/**
 * clear the different map-cell effect classes
 */
function cancelAction() {
	clearMoveGrid();
	clearAttackGrid();
}

/**
 * This sets the current turn to empty, and resets the turn counter
 * for the character
 */
function clearCurrentTurn() {
	cancelAction();
	currentTurn.stats.state.turn = 0;
	currentTurn = null;
	moved = false;
	acted = false;
	turnMode = null;
	$('.active-character').text('');
}

/**
 * Simply clears the current turn
 */
function skipTurn() {
	if(confirm("Skip your turn?") && currentTurn) {
		clearCurrentTurn();
	}
}

/**
 * The function triggered by clicking the 'move' button in the menu
 */
function moveAction() {
	//we only do something if there is a character with a turn
	if(currentTurn && ! moved) {
		showMoveGrid(currentTurn);
		turnMode = 'move';
	}
}

/**
 * This function is used to show the attack area, and make it selectable
 */
function attackAction() {
	if(currentTurn && ! acted) {
		showAttackGrid(currentTurn);
		turnMode = 'attack';
	}
}

var game = Game.getInstance();

// kick off the game loop
$(document).ready(game.game);