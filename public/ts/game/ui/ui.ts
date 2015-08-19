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
		$rows = $('#map .map-row');
	}

	/**
	 * This function loads the map into the DOM
	 */
	function loadMapInDOM(map) {

		//currently using dummy data for map
		var i, j,
			row = ''; //string used in appendTo()

		for(i = 0; i <= map.size.y; i += 1) {
			row = '<div class="map-row">';	
			for(j = 0; j <= map.size.x; j += 1)
				row += '<div class="map-cell" data-x="'+j+'" data-y="'+i+'"></div>';
			row += '</div>';
			$(row).appendTo($map);
		}
	}

	/**
	 * Bind the map cells to actions
	 */
	function bindCells() {
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
		$('#action-menu [data-action=move]').click(moveAction);
		$('#action-menu [data-action=attack]').click(attackAction);
		$('#action-menu [data-action=skip]').click(skipAction);
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
		var $cell = DomHelp.getMapCell($rows, c.stats.state.position.x, c.stats.state.position.y),
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
				$cell;

			$cell = DomHelp.getMapCell($rows, x, y);
			
			//selected position may fail
			if(DomHelp.moveableMapCell($cell)) {
				currentTurn.stats.state.position.x = x;
				currentTurn.stats.state.position.y = y;
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
				$cell,
				patientId,
				patient; //will be the target of action 
			
			//get effected cell
			$cell = DomHelp.getMapCell($rows, x, y);

			//selected position may fail
			if(DomHelp.attackableMapCell($cell)) {

				//get target character
				//ToDo: must support multiple
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

					if(GameHelp.turnOver())
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
		if (patient)
			patient.stats.state.hp = EntityHelp.calculateRemainingHp({}, agent, patient);
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
	function skipAction() {
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
}
