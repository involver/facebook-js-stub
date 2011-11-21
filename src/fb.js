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
