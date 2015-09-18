module EffectHelper {

	export function getEffect(effect: any)
		: (agent: Character, patient: Character) => any  {

		//this anonymous function will determine how to generate the effect function
		return (function(effect: any) {

			if (typeof effect === 'function')
				return function(agent: Character, patient: Character) {
					return effect(agent, patient);
				}

		})(effect);
	}
}
