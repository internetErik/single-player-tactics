
var basicMap = {
	name: 'The Scary Dungeon',
	//specify map size generically
	size: {
		//all of these are 1 based
		x: 10,
		y: 10,
		z: 3
	},
	//depth of 0
	grid: [ 
		[
		//order of array determines x,y coordinates
		// an empty object will be drawn as a div that isn't moveable
		//y===0
		[{
			_id: '1',
			ground: 'stone',
			trap: false
		},{},{},{},{},{},{},{},{},{}],
		//y===1
		[{},{},{},{},{},{},{},{},{},{}],
		//y===2
		[{},{},{},{},{},{},{},{},{},{}],
		//y===3
		[{},{},{},{},{},{},{},{},{},{}],
		//y===4
		[{},{},{},{},{},{},{},{},{},{}],
		//y===5
		[{},{},{},{},{},{},{},{},{},{}],
		//y===6
		[{},{},{},{},{},{},{},{},{},{}],
		//y===7
		[{},{},{},{},{},{},{},{},{},{}],
		//y===8
		[{},{},{},{},{},{},{},{},{},{}],
		//y===9
		[{},{},{},{},{},{},{},{},{},{}],
		],
		[], //empty array means nothing at this height
		[
		//order of array determines x,y coordinates
		// an empty object will be drawn as a div that isn't moveable
		//y===0
		[{},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		}],
		//y===1
		[{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		}],
		//y===2
		[{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		}],
		//y===3
		[{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		}],
		//y===4
		[{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		}],
		//y===5
		[{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		}],
		//y===6
		[{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		}],
		//y===7
		[{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		}],
		//y===8
		[{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		}],
		//y===9
		[{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		},{
			_id: '1',
			ground: 'stone',
			trap: false,
		}]
		]
	]
};