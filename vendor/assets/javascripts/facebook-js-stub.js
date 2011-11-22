var FB = (function(){
  var self = { };

  self.init = function(options) {
    FBStub.appId(options.appId);
  };

  self.login = function(callback) {
    if (!FBStub.initialized()) return;
    FBStub.loginCallback = callback;
  };

  self.getLoginStatus = function(callback) {
    if (!FBStub.initialized()) return;
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

  return self;
}( ));

var FBStub = (function() {
  var self = { };

  var state;

  var initialize = function() {
    state = {
      'loggedIn': false,
      'connected': false,
      'appId': null,
      'user': {}
    };
  };

  initialize();

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
  };

  self.appId = function(id) {
    if (id) {
      state.appId = id;
    }
    return state.appId;
  };

  self.reset = function() {
    initialize();
  };

  self.logInAndAuthorize = function() {
    if (!self.initialized()) return;
    self.loginCallback({
      status: "connected",
      authResponse: {
        accessToken: "",
        userID: "",
        expiresIn: 4374,
        signedRequest: ""
      }
    });
  };

  self.logInAndDeny = function() {
    if (!self.initialized()) return;
    self.loginCallback({
      status: "not_authorized",
      authResponse: null
    });
  };

  self.abortLogIn = function() {
    if (!self.initialized()) return;
    self.loginCallback({
      status: "unknown",
      authResponse: null
    });
  };

  self.initialized = function() {
    var appId = state.appId;
    return (typeof(appId) == 'number' || typeof(appId) == "string");
  };

  return self;
}( ));
