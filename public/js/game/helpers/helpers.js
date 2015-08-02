// big ass file for helpers.
// should be refactored into smaller file
/**
 * Decides if the game is still going
 * @return {boolean} the new value of gameOn
 */
function isGameOn(characters) {
    var team1Alive = false;
    var team2Alive = false;
    characters.forEach(function (c) {
        if (c.stats.state.hp > 0)
            (c.team === 1) ?
                team1Alive = true :
                team2Alive = true;
    });
    return (team1Alive && team2Alive);
}
/**
 * Advance all things that have a turn according to their speed.
 * If anyone gets turn >= 100, set currentTurn to them
 */
function advanceTime(characters) {
    characters.forEach(function (c) {
        c.stats.state.turn += c.stats.state.speed;
        if (c.stats.state.hp > 0 && c.stats.state.turn >= 100)
            currentTurn = c;
    });
}
