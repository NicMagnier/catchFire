
var catchFire = (function(){
	var _prefix = 'catch';
	var _catches = [];

	return {
		register: function(catcher) {
			// Let's check all the properties of the object and register the ones that start with the prefix
			for (prop in catcher) {
				if ( catcher.hasOwnProperty(prop) && prop.slice(0,_prefix.length)===_prefix ) {
					var eventName = prop.slice(_prefix.length);

					if ( !_catches[eventName] ) {
						_catches[eventName] = [];
					}
					_catches[eventName].push(catcher);
				} 
			}
		},

		fire: function(eventName) {
			if ( !_catches[eventName] ) {
				return;
			}

			for ( var i=0; i<_catches[eventName].length; i++) {
				var catcher = _catches[eventName][i];

				if ( (typeof catcher[_prefix+eventName])==='function' ) {
					// We create a new arguments array without the name of the event
					var args = [];
					for (p in arguments) {
						args.push(arguments[p]);
					}
					args.shift();

					// We call the ctaching function
					catcher[_prefix+eventName].apply(catcher, args);
				}
			}
		}

	};
})();