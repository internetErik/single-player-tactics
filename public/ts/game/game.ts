/// <reference path="../../tsd/typings/tsd.d.ts" />
/// <reference path="data/characters/characters.ts" />
/// <reference path="helpers/helpers.ts" />
/// <reference path="ui/ui.ts" />

// import * as Character from 'game/data/characters/characters';

//stubs/ideas
class Game {
	gameOn: boolean;
	// currentTurn: Character;
	eventQueue: Array<any>;
	map: any;

	constructor() {
		//initialize game
		//start loop
	}
}



/**
 * Flag that tells us if the game is still going
 * @type {Boolean}
 */
var gameOn = true;

/**
 * These track if the teams are dead yet
 * @type {Boolean}
 */
var team1Alive = false;
var team2Alive = false;

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
 * This function kicks off the game
 */
function game() {
	//
	// in the future, there should be a menu loop here?
	//
	
	initGameUI(basicMap, characters);

	//kick off game loop
	gameLoop();
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
	while(!currentTurn)
		advanceTime(characters);

	if (currentTurn)
		gameOn = isGameOn(characters);
	
	//Put current characters name over the menu
	$('.active-character').text(currentTurn.stats.name);		
	
	//if game still call gameLoop again
	if (gameOn)
		setTimeout(gameLoop, 1000);
	else
		displayVictor(team1Alive, team2Alive);
}

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
 * Shows the moveable area.  
 * Should calculate this, but now just effects entire area.
 * 
 * @param {Character} c [description]
 */
function showMoveGrid(c) {
	var mv = c.stats.state.move,
		x = c.stats.state.position.x,
		y = c.stats.state.position.y;
	
	//we could calculate, but instead we'll just make the whole map moveable
	$('.map-cell').addClass('map-cell_moveable');
}

/**
 * This function is called to stop movement action.
 * Used both if a movement is selected, or if it is cancelled
 */
function clearMoveGrid() {
	$('.map-cell').removeClass('map-cell_moveable');
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

/**
 * Add attackable class to all map cells
 *
 * ToDo: this should be calculated.
 * 
 * @param {Character} c [description]
 */
function showAttackGrid(c) {
	var mv = c.stats.state.move,
		x = c.stats.state.position.x,
		y = c.stats.state.position.y;
	
	//we could calculate, but instead we'll just make the whole map moveable
	$('.map-cell').addClass('map-cell_attackable');
}

/**
 * Remove the attackable class from map cells
 */
function clearAttackGrid() {
	$('.map-cell').removeClass('map-cell_attackable');
}

/**
 * This checks to see if a cell is uninhabited and exists
 * 
 * @param  {jQuery object}  $cell the cell that we are checking - may be null
 * @return {boolean}       True means that this is a safe cell to move to
 */
function moveableMapCell($cell):boolean {
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
function attackableMapCell($cell):boolean {
	//does the cell exist?
	if(!$cell || $cell.length === 0)
		return false;

	//does the cell have the attackable class?
	if (!$cell.hasClass('map-cell_attackable'))
		return false;

	return true;
}

/**
 * given an x and y position, get the cell on the map
 * 
 * @param {number} x coordinate
 * @param {number} y coordinate
 */
function getMapCell(x:number, y:number) {
	//$rows is a global
	return $( $( $rows[y] ).children('.map-cell')[x] );
}

/**
 * Very simple removal of character from the DOM
 * the characters _id was used in creating the DOM element
 */
function clearCharacterInDom(c) {
	$('#' + c._id).remove();
}

// kick off the game loop
$(document).ready(game);