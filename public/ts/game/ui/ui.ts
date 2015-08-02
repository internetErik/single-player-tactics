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
function initGameUI(map, characters) {
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
}

/**
 * Loads map into global variable $map
 */
function cacheMap() {
	$map = $('#map');
}

/**
 * This function loads the map into the DOM
 */
function loadMapInDOM(map) {

	//currently using dummy data for map
	//data/maps/map.js -> basicMap {}
	var i = 0,
		j = 0,
		row = ''; //string used in appendTo()

	for(i = 0; i <= map.size.width; i += 1) {
		row = '<div class="map-row">';	
		for(j = 0; j < map.size.height; j += 1)
			row += '<div class="map-cell" data-x="'+j+'" data-y="'+i+'"></div>';
		row += '</div>';
		$(row).appendTo($map);
	}
}

/**
 * loads each row of the map into global variable $rows
 */
function cacheRows() {
	$rows = $('#map .map-row');
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
	//data/characters/characters.js -> characters [{}]
	characters.forEach(positionCharacterInDom);
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
 * Display the victory message
 */
function displayVictor(team1Alive, team2Alive) {
	if (team1Alive && ! team2Alive)
		$('#victory-message h1').text('Team 1 Wins!');
	else if(team2Alive && ! team1Alive)
		$('#victory-message h1').text('Team 2 Wins!');
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
