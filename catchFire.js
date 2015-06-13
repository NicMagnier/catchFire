
var catchFire = (function(){
	var _prefix = 'catch';
	var _catches = [];

	return {
		register: function(catcher) {
			// Let's check all the properties of the object and register the ones that start with the prefix
			checkProperties: for (prop in catcher) {
				if ( catcher.hasOwnProperty(prop) && prop.slice(0,_prefix.length)===_prefix ) {
					var eventName = prop.slice(_prefix.length);

					if ( !_catches[eventName] ) {
						_catches[eventName] = [];
					}

					// check if the catcher is already registered
					for ( var i=0; i<_catches[eventName].length; i++) {
						if ( _catches[eventName][i]===catcher ) {
							continue checkProperties;
						}
					}

					// add the catcher to the event
					_catches[eventName].push(catcher);
				} 
			}
		},

		unregister: function(catcher) {
			// for each event we check if they have the catcher object
			for (eventName in _catches) {
				for ( var i=0; i<_catches[eventName].length; i++) {
					if ( _catches[eventName][i]===catcher ) {
						_catches[eventName].splice(i,1);
					}
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