module EntityHelp {

	/**
	 * Advance all things that have a turn according to their speed.
	 * If anyone gets turn >= 100, set currentTurn to them
	 */
	export function advanceTime(characters) {
		var currentTurn;

		characters.forEach(function(c) {
			c.stats.state.turn += c.stats.state.speed;
			if (c.stats.state.hp > 0 && c.stats.state.turn >= 100)
				currentTurn = c;
		});

		return currentTurn;
	}

	/**
	 * Returns the change in health from an effect
	 * @param {[type]} effect  the action being performed
	 * @param {[type]} agent   the actor
	 * @param {[type]} patient the target of action
	 */
	export function calculateHealthChange(effect, agent, patient): number {
		return agent.stats.state.damage + patient.stats.state.defense;
	}

	/**
	 * Returns the remaining hp of characters
	 * doesn't allow a result less than 0
	 * 
	 * @param {[type]} effect  The action being performed
	 * @param {[type]} agent   The actor
	 * @param {[type]} patient The target of action
	 */
	export function calculateRemainingHp(effect, agent, patient): number {
		var hp = patient.stats.state.hp + calculateHealthChange(effect, agent, patient); 

		//don't allow hp to reduce below 0
		return (hp >= 0) ? hp : 0;
	}

}