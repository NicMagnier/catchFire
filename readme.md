# catchFire

Minimal script to handle global events.

It is useful for React applications to communicate between objects that don't have child-parent relations.

## How to create an object that want to receive events

1/ Simply add methods that start with 'catch' followed by the name of the global event
```javascript
this.catchOpenDocument = function(document) { // Your Code };
this.catchSwitchUser = function(userId, isGuest) { // Your Code };
```
the method catchOpenDocument will be called when the event 'OpenDocument' will be fired.

2/ When the object is constructed, initialized or simply added to the interface, register the object
```javascript
componentDidMount: function() {
	catchFire.register(this);
}
```
the library will automatically register the callback functions to their respective events.

## How to trigger a global event

Just fire the event

```javascript
catchFire.fire('OpenDocument', doc);
```

All the registered objects with a method called catchOpenDocument will be called (*as long as the method existed during the object registration*)

## How to clean up

when an object doesn't need to receive events (when deleted for example), simply unregister the object

```javascript
componentWillUnmount: function() {
	catchFire.unregister(this);
}
```

## React simple example

```javascript
var App = React.createClass({
	getInitialState: function() {
		return {
			documentID: 'readme',
			userID: 'nic',
			userDisplayName: 'Nic Magnier'
		}
	},

	componentDidMount: function() {
		catchFire.register(this);
	}

	componentWillUnmount: function() {
		catchFire.unregister(this);
	}

	catchNewDocumentSelected: function(docID) {
		this.setState({documentID: docID});
	},

	catchSwitchUser: function(id, displayName) {
		this.setState({userID: id, userDisplayName: displayName});
	},

	render: function() {
		// Imagine a beautiful App there
	}
});

var UserSelection = React.createClass({
	handleClickOnUser: function(e) {
		// switch the user of the app

		// inform the rest of the interface the user changed
		catchFire.fire('SwitchUser', this.state.currentUserId, this.state.userDisplayName);
	},

	render: function() {
		// Picture an imaginative interface to select a user account
	}
});
```



