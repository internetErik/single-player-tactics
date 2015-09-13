class Effect {
	
	effect: any; //this is the function that will be called by the Effect object
	
	constructor(effect: any) {

		this.effect = (function(effect: any): 
			(agent: Character, patient: Character) => any {

			if (typeof effect === 'function')
				return function(agent: Character, patient: Character) {
					return effect(agent, patient);
				}
		})(effect);
	}
}
