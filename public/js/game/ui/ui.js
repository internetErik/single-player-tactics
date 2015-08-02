/**
 * Display the victory message
 */
function displayVictor(team1Alive, team2Alive) {
    if (team1Alive && !team2Alive)
        $('#victory-message h1').text('Team 1 Wins!');
    else if (team2Alive && !team1Alive)
        $('#victory-message h1').text('Team 2 Wins!');
}
/**
 * This displays what will happen from an effect
 *
 * @param {Character} agent   The actor
 * @param {Character} patient the target
 */
function showEffectStats(agent, patient) {
    var $actionView = $('#action-effects-view'), $agentName = $actionView.find('.agent-name'), $aHealthChange = $actionView.find('.agent-health-change'), $patientName = $actionView.find('.patient-name'), $pHealthChange = $actionView.find('.patient-health-change'), aDamage = agent.stats.state.damage, aHealth = agent.stats.state.hp, pHealth, pNewHealth;
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
    var $actionView = $('#action-effects-view'), $agentName = $actionView.find('.agent-name'), $aHealthChange = $actionView.find('.agent-health-change'), $patientName = $actionView.find('.patient-name'), $pHealthChange = $actionView.find('.patient-health-change');
    $agentName.text('');
    $patientName.text('');
    $pHealthChange.text('');
}
