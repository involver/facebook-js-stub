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

  var apiRequests = { };

  self.addApiRequest = function(path, callback) {
    apiRequests[path] = callback;
  };

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

  self.respondToApiRequest = function(path, response) {
    if (typeof(apiRequests[path]) === 'undefined') return;
    apiRequests[path](response);
  };

  self.initialized = function() {
    var appId = state.appId;
    return (typeof(appId) == 'number' || typeof(appId) == "string");
  };

  return self;
}( ));
