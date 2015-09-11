var EntityHelp;
(function (EntityHelp) {
    /**
     * Advance all things that have a turn according to their speed.
     * If anyone gets turn >= 100, set currentTurn to them
     */
    function advanceTime(characters) {
        var currentTurn, candidates;
        //ToDo: I need to plan out a list of upcoming turns and simply
        //	reorder that based on new events added to queue 
        //iterate through all characters and advance their turn
        characters.forEach(function (character) {
            character.ct += character.cstat.speed;
        });
        //find characters that are at or over 100 and sort them by highest turn
        candidates = characters.filter(function (character) {
            return (character.cstat.hp > 0 &&
                character.ct >= 100) ?
                true : false;
        }).sort(function (a, b) {
            if (a.ct > b.ct)
                return 1;
            else if (a.ct < b.ct)
                return -1;
            return 0;
        });
        //if there are any candidates we will assign one of them to current turn
        if (candidates.length > 0) {
            //should find all characters with the same turn and select from them by 
            // 1) speed, 2) level, 3) job level, 4) xp, 5) jp, 6) hp, 7) mp, 8) random num
            // if(candidates.length > 1);
            currentTurn = candidates[0];
        }
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
        return effect(agent, patient);
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
        var hp = patient.cstat.hp + calculateHealthChange(effect, agent, patient);
        //don't allow hp to reduce below 0
        return (hp >= 0) ? hp : 0;
    }
    EntityHelp.calculateRemainingHp = calculateRemainingHp;
})(EntityHelp || (EntityHelp = {}));
