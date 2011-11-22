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
