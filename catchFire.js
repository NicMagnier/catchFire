
var catchFire = {
	prefix: 'catch',
	catches: [],

	register: function(catcher) {
		// if this is not an object (or an array) we simply leave it here
		if ( (typeof catcher)!=='object' ) {
			return;
		}

		// if we receive an array, we register every object in it
		if ( Object.prototype.toString.call(catcher)==='[object Array]' ) {
			for ( var i=0; i<catcher.length; i++) {
				catchFire.register(catcher[i]);
			}
			return;
		}

		// Let's check all the function of the object and register the catch functions
		for (prop in catcher) {
			if ( catcher.hasOwnProperty(prop) && (typeof catcher[prop])==='function' ) {

				// If this is a catch function, we add the object to the event name
				if ( prop.slice(0,catchFire.prefix.length)===catchFire.prefix ) {
					var eventName = prop.slice(catchFire.prefix.length);

					if ( (typeof catchFire.catches[eventName])==='undefined' ) {
						catchFire.catches[eventName] = [];
					}
					catchFire.catches[eventName].push(catcher);
				}
			} 
		}
	},

	fire: function(eventName) {
		var i, args, catcher;

		if ( (typeof catchFire.catches[eventName])!=='object' ) {
			return;
		}

		for ( i=0; i<catchFire.catches[eventName].length; i++) {
			catcher = catchFire.catches[eventName][i];

			if ( (typeof catcher[catchFire.prefix+eventName])==='function' ) {

				// We create a new arguments array without the name of the event
				args = [];
				for (p in arguments) {
					args.push(arguments[p]);
				}
				args.shift();

				// We call the ctaching function
				catcher[catchFire.prefix+eventName].apply(catcher, args);
			}
		}
	}

};