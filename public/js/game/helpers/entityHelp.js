var EntityHelp;
(function (EntityHelp) {
    /**
     * Advance all things that have a turn according to their speed.
     * If anyone gets turn >= 100, set currentTurn to them
     */
    function advanceTime(characters) {
        var currentTurn;
        //ToDo: I need a more sophisticated way of determining who is next
        //	since now the last person who meets this criteria comes up next
        //ToDo: I need to plan out a list of upcoming turns and simply
        //	reorder that based on new events added to queue 
        //iterate through all characters and if any are
        //1) alive, and 2) at 100 turn state set them as next
        characters.forEach(function (character) {
            character.stats.state.turn += character.stats.state.speed;
            if (character.stats.state.hp > 0 &&
                character.stats.state.turn >= 100)
                currentTurn = character;
        });
        return currentTurn;
    }
    EntityHelp.advanceTime = advanceTime;
    /**
     * Returns the change in health from an effect
     * @param {[type]} effect  the action being performed
     * @param {[type]} agent   the actor
     * @param {[type]} patient the target of action
     */
    function calculateHealthChange(effect, agent, patient) {
        return agent.stats.state.damage + patient.stats.state.defense;
    }
    EntityHelp.calculateHealthChange = calculateHealthChange;
    /**
     * Returns the remaining hp of characters
     * doesn't allow a result less than 0
     *
     * @param {[type]} effect  The action being performed
     * @param {[type]} agent   The actor
     * @param {[type]} patient The target of action
     */
    function calculateRemainingHp(effect, agent, patient) {
        var hp = patient.stats.state.hp + calculateHealthChange(effect, agent, patient);
        //don't allow hp to reduce below 0
        return (hp >= 0) ? hp : 0;
    }
    EntityHelp.calculateRemainingHp = calculateRemainingHp;
})(EntityHelp || (EntityHelp = {}));
