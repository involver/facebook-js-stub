var FB = (function(){
  var self = { };
  var appId;

  self.init = function(options) {
    appId = options.appId;
  };

  self.getLoginStatus = function(callback) {
    if (!initialized()) return;
    var status;
    var authResponse = null;

    if (FBStub.isLoggedIn()) {
      if (FBStub.isConnected()) {
        status = "connected";
        authResponse = {
          accessToken: "",
          expiresIn: 4095,
          signedRequest: "",
          userID: FBStub.userID()
        };
      }
      else {
        status = "not_authorized";
      }
    }
    else {
      status = "unknown";
    }

    callback({
      status: status,
      authResponse: authResponse
    });
  };

  function initialized() {
    return (typeof(appId) == 'number' || typeof(appId) == "string");
  }

  return self;
}( ));

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
