var FBStub = (function() {
  var self = { };

  var state;

  var inititialize = function() {
    state = {
      'loggedIn': false,
      'connected': false,
      'user': {}
    };
  }( );

  self.loggedIn = function(user) {
    state.loggedIn = true;
    state.user = user || {};
  };

  self.notLoggedIn = function() {
    state.loggedIn = false;
    state.user = {};
  };

  self.connected = function() {
    state.connected = true;
  };

  self.notConnected = function() {
    state.connected = false;
  };

  self.isLoggedIn = function() {
    return state.loggedIn;
  };

  self.isConnected = function() {
    return state.connected;
  };

  self.userID = function() {
    return state.user.userID;
  }

  return self;
}( ));
