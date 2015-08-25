/// <reference path="../helpers/domHelp.ts" />
/// <reference path="../helpers/entityHelp.ts" />
/// <reference path="../helpers/gameHelp.ts" />

module UI {
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
	 * Initializes the user interface
	 * 
	 * @param {Map} map        the map we are loading
	 * @param {Array<Character>} characters All the characters being used
	 */
	export function initGameUI(map, characters) {

		//initialize game only after everything is ready
		$(document).ready(function() { 
			//init global map
			cacheMap();

			//prepare the game
			loadMapInDOM(map);
			
			//cache the rows of the map
			cacheRows();

			//set up events on map
			bindCells();

			//position characters initially
			loadCharactersInDOM(characters);

			//bind click events on menu 
			bindMenu();

			//bind ui view menu
			bindViewMenu();
		});
	}

	/**
	 * Display the victory message
	 */
	export function displayVictor(team1Alive, team2Alive) {
		if (team1Alive && ! team2Alive)
			$('#victory-message h1').text('Team 1 Wins!');
		else if(team2Alive && ! team1Alive)
			$('#victory-message h1').text('Team 2 Wins!');
	}

	/**
	 * Loads map into global variable $map
	 */
	function cacheMap() {
		$map = $('#map');
	}

	/**
	 * loads each row of the map into global variable $rows
	 */
	function cacheRows() {
		//$rows is a global
		$rows = $('#map .map-row');
		// $rows = $rows.filter(row => $(row).children('.map-cell').length > 0);
	}

	/**
	 * This function loads the map into the DOM
	 */
	function loadMapInDOM(map) {
		var k;
			
		for (k = 0; k <= map.size.z; k += 1) {
			//insert a new level
			$('<div class="map-level" data-z="' + k + '"></div>').appendTo($map);
			
			//if this level is not empty generate generate it
			if (map['z' + k].length > 0)
				$(generateLevel(map['z' + k], k)).appendTo('.map-level[data-z=' + k + ']');
		}
	}

	
	/**
	 * Given that this level isn't empty, create the html for it
	 * 
	 * @param  {Array<any>} rows the rows in the level to be generated
	 * @param  {number} level the number of the level we are on
	 * @return {string}          the resulting html to be appended to DOM
	 */
	function generateLevel(rows: Array<any>, level: number): string {
		var innerLevel = '',
			sideWidth = 75; //the width/height of these squares

		rows.forEach(function(row, i) {
			if (row.length > 0) {
				innerLevel += '<div class="map-row" data-y="' + i + '" data-z="' + level + '">';
				innerLevel += row.reduce(function(p, c, j) {
					return (c._id) ?
						p + '<div class="map-cell" style="top:' + sideWidth * i + 'px; left:' + sideWidth * j + 'px;" data-x="' + j + '" data-y="' + i + '" data-z="' + level + '"></div>'
						: p;
				}, '');
				innerLevel += "</div>";
			}
		});

		return innerLevel;
	}

	/**
	 * Bind the map cells to actions
	 */
	function bindCells(): void {
		$('#map .map-cell').click(cellInteraction);
	}

	/**
	 * This function loads ALL of the characters into the DOM
	 */
	function loadCharactersInDOM(characters) {
		//currently using dummy data for characters
		characters.forEach(positionCharacterInDom);
	}

	/**
	 * Bind the various menu options to generic functions
	 */
	function bindMenu() {
		$('#action-menu [data-action=move]').click(turnModeMove);
		$('#action-menu [data-action=attack]').click(turnModeAttack);
		$('#action-menu [data-action=skip]').click(skipTurn);

		$(window).on('keyup', function(e){
			if (e.keyCode === 77) //'m' = move
				turnModeMove();
			else if (e.keyCode === 65)//'a' = attack
				turnModeAttack();
			else if (e.keyCode === 83)//'s' = skip turn
				skipTurn();
		});
	}

	/**
	 * Bind the buttons for the ui view options such as turn
	 * and tilt
	 */
	function bindViewMenu() {
		// $('#view-controls [data-action=turn]').click(turnUiAction);
	}

	/**
	 * This function loads on character into the DOM. It is called by
	 * loadCharactersInDom()
	 * 
	 * The character placed in the DOM is given an #id === to the character's _id
	 * @param      {Character}  c       This represents a single character
	 */
	function positionCharacterInDom(c) {
		// This line 
	 	// 	1) gets the row we are in, then 
		// 	2) finds the cell in that row, then 
		// 	3) makes that a jquery object
		var $cell = DomHelp.getMapCell($rows, c.stats.state.position.x, c.stats.state.position.y, c.stats.state.position.z),
			insert = ''; //this is the html we will insert

		insert = '<span class="character" id="' + c._id + '"">';
		insert += c.stats.name;
		insert += '</span>';

		$(insert).appendTo($cell);
	}

	/**
	 * Very simple removal of character from the DOM
	 * the characters _id was used in creating the DOM element
	 */
	function clearCharacterInDom(c) {
		$('#' + c._id).remove();
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
			aDamage = EntityHelp.calculateHealthChange({}, agent, patient),
			pHealth,
			pNewHealth;
		
		if (patient) {
			pHealth = patient.stats.state.hp;
			pNewHealth = EntityHelp.calculateRemainingHp({}, agent, patient);

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
	 * Shows the moveable area.  
	 * Should calculate this, but now just effects entire area.
	 * 
	 * @param {Character} c [description]
	 */
	function showMoveGrid(c) {
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
	 * Add attackable class to all map cells
	 *
	 * ToDo: this should be calculated.
	 * 
	 * @param {Character} c [description]
	 */
	function showAttackGrid(c) {	
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
	 * function that is called when a cell is clicked on.  
	 * It will route to the correct user event.
	 *
	 * I bind the context of the event to the function so 
	 * `this` will be the cell clicked on.
	 */
	function cellInteraction() {
		// how do I not need turnMode?
		// Could I use the current class on this?
		if (turnMode === 'move') move.bind(this)();
		else if (turnMode === 'attack') attack.bind(this)();
	}

	/**
	 * positions character and clears current turn when a movement has been
	 * decided on
	 */
	function move() {
		//how do I stop needing the currentTurn object?
		//we only do something if there is a character with a turn
		if(currentTurn) {
			var x = this.getAttribute('data-x'),
				y = this.getAttribute('data-y'),
				z = this.getAttribute('data-z'),
				$cell;

			$cell = DomHelp.getMapCell($rows, x, y, z);
			
			//selected position may fail
			if(DomHelp.moveableMapCell($cell)) {
				currentTurn.stats.state.position.x = x;
				currentTurn.stats.state.position.y = y;
				currentTurn.stats.state.position.z = z;
				clearCharacterInDom(currentTurn);
				positionCharacterInDom(currentTurn);
				clearMoveGrid();
				moved = true;

				if(GameHelp.turnOver())
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
				z = this.getAttribute('data-z'),
				$cell,
				patientId,
				patient; //will be the target of action 
			
			//get effected cell
			$cell = DomHelp.getMapCell($rows, x, y, z);

			//selected position may fail
			if(DomHelp.attackableMapCell($cell)) {

				//get target character
				//ToDo: must support multiple
				patientId = $cell.children('.character').attr('id');
				patient = characters.reduce(function(p, c) {
					if (p) return p;
					if (c._id === patientId) return c;
				}, null);

				if (patient) {

					showEffectStats(currentTurn, patient);
					if (confirm("Are you sure you want to attack?")) {
						//apply effects - damage for now
						performAction(currentTurn, patient);
						clearAttackGrid();
						acted = true;

						if (GameHelp.turnOver())
							clearCurrentTurn();
					}

					clearEffectStats();
				}
				else
					console.warn("Attacked cell with no characters in it.");
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
		if (patient)
			patient.stats.state.hp = EntityHelp.calculateRemainingHp({}, agent, patient);
	}

	/**
	 * clear the different map-cell effect classes
	 */
	function defaultMapState() {
		clearMoveGrid();
		clearAttackGrid();
	}

	/**
	 * This sets the current turn to empty, and resets the turn counter
	 * for the character
	 */
	function clearCurrentTurn() {
		defaultMapState();
		currentTurn.stats.state.turn = 0;
		currentTurn = null;
		moved = false;
		acted = false;
		turnMode = null;
		$('.active-character').text('');
	}

	/**
	 * the function triggered by clicking 'skip turn' button in the menu
	 * or pressing 's' when a player has a turn
	 * skips a turn
	 */
	function skipTurn() {
		if(currentTurn && confirm("Skip your turn?")) {
			clearCurrentTurn();
		}
	}

	/**
	 * The function triggered by clicking the 'move' button in the menu
	 * or pressing 'm' when a player has a turn
	 */
	function turnModeMove() {
		//we only do something if there is a character with a turn
		if(currentTurn && ! moved) {
			showMoveGrid(currentTurn);
			turnMode = 'move';
		}
	}

	/**
	 * This function is used to show the attack area, and make it selectable
	 * or pressing 'a' when a player has a turn
	 */
	function turnModeAttack() {
		if(currentTurn && ! acted) {
			showAttackGrid(currentTurn);
			turnMode = 'attack';
		}
	}
}
