module UI {
	/****************************************
	 * EXPORTED
	 *
	 * function initGameUI - Game kicks off ui
	 * function displayVictor - gameLoop determines if there is a victor and calls this
	 * 
	 ****************************************/


	/**	 * Represents the map
	 * @type {JQuery}
	 */
	var $map: JQuery;

	/**
	 * Cache of all the rows in the map
	 * @type {JQuery}
	 */
	var $rows: JQuery;

	var characters: Character[] = [];

	var map: any;

	/**
	 * Initializes the user interface
	 * 
	 * @param {Map} map        the map we are loading
	 * @param {Array<Character>} characters All the characters being used
	 */
	export function initGameUI(m, chars: Character[]) {
		characters = chars;
		map = m;

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
			loadCharactersInDOM();

			//bind click and keyboard events on menu 
			bindMenu();

			//bind ui view menu
			bindViewMenu();
		});
	}

	/**
	 * Loads map into global variable $map
	 */
	function cacheMap(): void {
		$map = $('#map');
	}

	/**
	 * loads each row of the map into global variable $rows
	 */
	function cacheRows(): void {
		//$rows is a global
		$rows = $('#map .map-row');
	}

	/**
	 * This function loads the map into the DOM
	 */
	function loadMapInDOM(map): void {
		map.grid.forEach((rows: any[], level: number) => {
			//insert a new level
			$(`<div class="map-level" data-z="${level}"></div>`).appendTo($map);

			$(generateLevel(rows, level)).appendTo(`.map-level[data-z=${level}]`);
		});
	}

	
	/**
	 * Given that this level isn't empty, create the html for it
	 * 
	 * @param  {Array<any>} rows the rows in the level to be generated
	 * @param  {number} level the number of the level we are on
	 * @return {string}          the resulting html to be appended to DOM
	 */
	function generateLevel(rows: any[], level: number): string {
		var innerLevel = '',
			sideWidth = 75; //the width/height of these squares

		rows.forEach((row, i) => {
			if (row.length > 0) {
				innerLevel += `<div class="map-row" data-y="${i}" data-z="${level}">`;
				innerLevel += row.reduce((p, c, j) => {
					return (c._id) ?
						p + `<div class="map-cell" style="top: ${sideWidth * i}px; left: ${sideWidth * j}px;" data-x="${j}" data-y="${i}" data-z="${level}"></div>`
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
	function loadCharactersInDOM(): void {
		characters.forEach(positionCharacterInDom);
	}

	/**
	 * This function loads on character into the DOM. It is called by
	 * loadCharactersInDom()
	 * 
	 * The character placed in the DOM is given an #id === to the character's _id
	 * @param      {Character}  c       This represents a single character
	 */
	function positionCharacterInDom(c: Character): void {
		// This line 
		// 	1) gets the row we are in, then 
		// 	2) finds the cell in that row, then 
		// 	3) makes that a jquery object
		var $cell = DomHelper.getMapCell($rows, c.position.x, c.position.y, c.position.z),
			insert = `<span class="character" id="${c._id}">${c.name}</span>`;

		$(insert).appendTo($cell);
	}

	/**
	 * Bind the various menu options to generic functions
	 */
	function bindMenu(): void {
		$('#action-menu [data-action=move]').click(turnModeMove);
		$('#action-menu [data-action=attack]').click(turnModeAttack);
		$('#action-menu [data-action=wait]').click(characterWait);

		$(window).on('keyup', (e) => {
			if (e.keyCode === 77) //'m' = move
				turnModeMove();
			else if (e.keyCode === 65)//'a' = attack
				turnModeAttack();
			else if (e.keyCode === 87)//'w' = wait
				characterWait();
		});
	}

	/**
	 * Bind the buttons for the ui view options such as turn
	 * and tilt
	 */
	function bindViewMenu(): void {
		// $('#view-controls [data-action=turn]').click(turnUiAction);
	}

	/**
	 * Very simple removal of character from the DOM
	 * the characters _id was used in creating the DOM element
	 */
	function clearCharacterInDom(c: Character): void {
		$('#' + c._id).remove();
	}

	/**
	 * This displays what will happen from an effect
	 * 
	 * @param {Object}    effect   What is happening
	 * @param {Character} agent   The actor
	 * @param {Character} patient the target
	 */
	function showEffectStats(effect, agent: Character, patient: Character): void {
		var $actionView = $('#action-effects-view'),
			$agentName = $actionView.find('.agent-name'),
			$aHealthChange = $actionView.find('.agent-health-change'),
			$patientName = $actionView.find('.patient-name'),
			$pHealthChange = $actionView.find('.patient-health-change'),
			aDamage = EntityHelper.calculateHealthChange(effect, agent, patient),
			pHealth,
			pNewHealth;
		
		if (patient) {
			pHealth = patient.cstat.hp;
			pNewHealth = EntityHelper.calculateRemainingHp(effect, agent, patient);

			$agentName.text(agent.name);
			$patientName.text(patient.name);

			$pHealthChange.text(`${pHealth}hp ${aDamage} -> ${pNewHealth}hp`);
		}
		else {
			$agentName.text(agent.name);
			$patientName.text("Nobody");
		}
	}

	/**
	 * Clears display information from an effect on a target
	 */
	function clearEffectStats(): void {
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
	 */
	function showMoveGrid(): void {
		var graph = buildActionGraph();
		$('.map-cell').addClass('map-cell_moveable');
	}

	/**
	 * buildActionGraph
	 * 
	 * @return {any[]} items in the graph that are within basic range
	 */
	function buildActionGraph(): any[] {
		//in combination with the Direction enum, we have an easy way to move around the grid
		var directions = [[0, -1], [1, 0], [0, 1], [-1, 0]]; //N, S, E, W

		if(currentTurn) {
			let x = currentTurn.position.x,
				y = currentTurn.position.y,
				z = currentTurn.position.z;

			if (!map.grid[z][y][x] || !map.grid[z][y][x]._id) {
				console.error("CurrentTurn is on a spot not on the map");
				return [];
			}


			//map is an object that has levels

		}
		return [];
	}

	/**
	 * This function is called to stop movement action.
	 * Used both if a movement is selected, or if it is cancelled
	 */
	function clearMoveGrid(): void {
		$('.map-cell').removeClass('map-cell_moveable');
	}

	/**
	 * Add attackable class to all map cells
	 *
	 * ToDo: this should be calculated.
	 */
	function showAttackGrid(): void {	
		//we could calculate, but instead we'll just make the whole map moveable
		$('.map-cell').addClass('map-cell_attackable');
	}

	/**
	 * Remove the attackable class from map cells
	 */
	function clearAttackGrid(): void {
		$('.map-cell').removeClass('map-cell_attackable');
	}

	/**
	 * function that is called when a cell is clicked on.  
	 * It will route to the correct user event.
	 *
	 * I bind the context of the event to the function so 
	 * `this` will be the cell clicked on.
	 */
	function cellInteraction(): void {
		// how do I not need turnMode?
		// Could I use the current class on this?
		if (turnMode === 'move') move.bind(this)();
		else if (turnMode === 'attack') attack.bind(this)();
	}

	/**
	 * positions character and clears current turn when a movement has been
	 * decided on
	 */
	function move(): void {
		//how do I stop needing the currentTurn object?
		//we only do something if there is a character with a turn
		if(currentTurn) {
			var x = this.getAttribute('data-x'),
				y = this.getAttribute('data-y'),
				z = this.getAttribute('data-z'),
				$cell;

			$cell = DomHelper.getMapCell($rows, x, y, z);
			
			//selected position may fail
			if(DomHelper.moveableMapCell($cell)) {
				currentTurn.position.x = x;
				currentTurn.position.y = y;
				currentTurn.position.z = z;
				clearCharacterInDom(currentTurn);
				positionCharacterInDom(currentTurn);
				clearMoveGrid();
				moved = true;

				if(GameHelper.turnOver())
					clearCurrentTurn();
			}
		}
	}

	/**
	 * This is called when a character is attacking and has clicked on 
	 * another cell.  We don't know if this cell has a target in it yet.
	 */
	function attack(): void {
		if(currentTurn) {
			var x = this.getAttribute('data-x'),
				y = this.getAttribute('data-y'),
				z = this.getAttribute('data-z'),
				$cell,
				patientId,
				patient, //will be the target of action 
				effect = currentTurn.getAttackEffect();
			
			//get effected cell
			$cell = DomHelper.getMapCell($rows, x, y, z);

			//selected position may fail
			if(DomHelper.attackableMapCell($cell)) {

				//get target character
				//ToDo: must support multiple
				patientId = $cell.children('.character').attr('id');
				patient = characters.reduce(function(p, c) {
					if (p) return p;
					if (c._id === patientId) return c;
				}, null);

				if (patient) {
					showEffectStats(effect, currentTurn, patient);
					if (confirm("Are you sure you want to attack?")) {
						//apply effects - damage for now
						performAction(effect, currentTurn, patient);
						clearAttackGrid();
						acted = true;

						if (GameHelper.turnOver())
							clearCurrentTurn();
					}

					clearEffectStats();
				}
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
	function performAction(effect, agent: Character, patient: Character): void {
		if (patient)
			patient.cstat.hp = EntityHelper.calculateRemainingHp(effect, agent, patient);
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
	 * 
	 * @param {number} turnCharge the value to set the character's turn 
	 *                              to if they haven't done anything.
	 */
	function clearCurrentTurn(turnCharge: number = 0): void {
		defaultMapState();
		
		currentTurn.ct = (moved || acted) ? 0 : turnCharge;

		currentTurn = null;
		moved = false;
		acted = false;
		turnMode = null;

		$('.active-character').text('');
	}

	/**
	 * the function triggered by clicking 'Wait' button in the menu
	 * or pressing 'w' when a player has a turn
	 * has character miss turn, but regain some turn charge
	 */
	function characterWait(): void {
		if(currentTurn && confirm("Wait and pass on your turn?")) {
			clearCurrentTurn(50);//pass in a value to set character turn to
		}
	}

	/**
	 * The function triggered by clicking the 'move' button in the menu
	 * or pressing 'm' when a player has a turn
	 */
	function turnModeMove(): void {
		//we only do something if there is a character with a turn
		if(currentTurn && ! moved) {
			showMoveGrid();
			turnMode = 'move';
		}
	}

	/**
	 * This function is used to show the attack area, and make it selectable
	 * or pressing 'a' when a player has a turn
	 */
	function turnModeAttack(): void {
		if(currentTurn && ! acted) {
			showAttackGrid();
			turnMode = 'attack';
		}
	}

	/**
	 * Display the victory message
	 */
	export function displayVictor(team1Alive: boolean, team2Alive: boolean): void {
		if (team1Alive && !team2Alive)
			$('#victory-message h1').text('Team 1 Wins!');
		else if (team2Alive && !team1Alive)
			$('#victory-message h1').text('Team 2 Wins!');
	}
}
