/// <reference path="../../tsd/typings/tsd.d.ts" />
/// <reference path="data/characters/characters.ts" />

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
 * Represents the map
 * @type {jQuery}
 */
var $map;

/**
 * Cache of all the rows in the map
 * @type {jQuery}
 */
var $rows;

/**
 * This function kicks off the game
 */
function game() {
	//
	// in the future, there should be a menu loop here?
	//

	//init global map
	$map = $('#map');


	//bind click events on menu 
	bindMenu();

	//prepare the game
	loadMapInDOM();

	//set up events on map
	bindCells();
	
	//cache the rows of the map
	$rows = $('#map .map-row');

	//position characters initially
	loadCharactersInDOM();

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
		advanceTime();

	if (currentTurn)
		gameOn = isGameOn();
	
	//Put current characters name over the menu
	$('.active-character').text(currentTurn.stats.name);		
	
	//if game still call gameLoop again
	if (gameOn)
		setTimeout(gameLoop, 1000);
	else
		displayVictor();
}

/**
 * Display the victory message
 */
function displayVictor() {
	if (team1Alive)
		$('#victory-message h1').text('Team 1 Wins!');
	else 
		$('#victory-message h1').text('Team 2 Wins!');
}

/**
 * Decides if the game is still going
 * @return {boolean} the new value of gameOn
 */
function isGameOn(): boolean {
	team1Alive = false;
	team2Alive = false;

	characters.forEach(function(c){
		if (c.stats.state.hp > 0)
			(c.team === 1) ? 
				team1Alive = true : 
				team2Alive = true ;
	});

	return (team1Alive && team2Alive);
}


/**
 * Advance all things that have a turn according to their speed.
 * If anyone gets turn >= 100, set currentTurn to them
 */
function advanceTime() {
	characters.forEach(function(c) {
		c.stats.state.turn += c.stats.state.speed;
		if (c.stats.state.hp > 0 && c.stats.state.turn >= 100)
			currentTurn = c;
	});
}

/**
 * Bind the map cells to actions
 */
function bindCells() {
	$('#map .map-cell').click(cellInteraction);
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
 * This displays what will happen from an effect
 * 
 * @param {Character} agent   The actor
 * @param {Character} patient the target
 */
function showEffectStats(agent, patient) {
	var $actionView = $('#action-effects-view'),
		$agentName = $actionView.find('.agent-name'),
		$aHealthChange = $actionView.find('.agent-health-change'),
		$patientName = $actionView.find('.patient-name'),
		$pHealthChange = $actionView.find('.patient-health-change'),
		aDamage = agent.stats.state.damage,
		aHealth = agent.stats.state.hp,
		pHealth,
		pNewHealth;
	
	if (patient) {
		pHealth = patient.stats.state.hp;
		pNewHealth = pHealth + aDamage;

		//don't let health drop below 0;
		pNewHealth = (pNewHealth >= 0) ? pNewHealth : 0;

		$agentName.text(agent.stats.name);
		$patientName.text(patient.stats.name);

		$pHealthChange.text(pHealth + 'hp ' + aDamage + ' -> ' + pNewHealth + 'hp');
	}
	else {
		$agentName.text(agent.stats.name);
		$patientName.text("Nobody");
	}
}

/**
 * Clears display information from an effect on a target
 */
function clearEffectStats() {
	var $actionView = $('#action-effects-view'),
		$agentName = $actionView.find('.agent-name'),
		$aHealthChange = $actionView.find('.agent-health-change'),
		$patientName = $actionView.find('.patient-name'),
		$pHealthChange = $actionView.find('.patient-health-change');

	$agentName.text('');
	$patientName.text('');
	$pHealthChange.text('');
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
 * Bind the various menu options to generic functions
 */
function bindMenu() {
	$('#action-menu [data-action=move]').click(moveAction);
	$('#action-menu [data-action=attack]').click(attackAction);
	$('#action-menu [data-action=skip]').click(skipTurn);
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
 * This function loads the map into the DOM
 */
function loadMapInDOM() {

	//currently using dummy data for map
	//data/maps/map.js -> basicMap {}
	var i = 0,
		j = 0,
		row = ''; //string used in appendTo()

	for(i = 0; i <= basicMap.size.width; i += 1) {
		row = '<div class="map-row">';	
		for(j = 0; j < basicMap.size.height; j += 1)
			row += '<div class="map-cell" data-x="'+j+'" data-y="'+i+'"></div>';
		row += '</div>';
		$(row).appendTo($map);
	}
}

/**
 * This function loads ALL of the characters into the DOM
 */
function loadCharactersInDOM() {
	//currently using dummy data for characters
	//data/characters/characters.js -> characters [{}]
	characters.forEach(positionCharacterInDom);
}

/**
 * This function loads on character into the DOM. It is called by
 * loadCharactersInDom()

 * The character placed in the DOM is given an #id === to the character's _id
 * @param      {Character}  c       This represents a single character
 */
function positionCharacterInDom(c) {
	// This line 
 	// 	1) gets the row we are in, then 
	// 	2) finds the cell in that row, then 
	// 	3) makes that a jquery object
	var $cell = getMapCell(c.stats.state.position.x, c.stats.state.position.y),
		insert = ''; //this is the html we will insert

	insert = '<span class="character" id="' + c._id + '"">';
	insert += c.stats.name;
	insert += '</span>';

	$(insert).appendTo($cell);
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