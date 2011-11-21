describe("FB.getLoginStatus", function() {
  var callbacks;

  beforeEach(function() {
    callbacks = {
      getLoginStatus: function() {}
    };
    spyOn(callbacks, 'getLoginStatus');
  });

  describe("when FB has not been initialized", function() {
    it("should not call the callback function", function() {
      FB.getLoginStatus(callbacks.getLoginStatus);
      expect(callbacks.getLoginStatus).not.toHaveBeenCalled();
    });
  });

  describe("when FB has been initialized", function() {
    beforeEach(function() {
      FB.init({appId: 123});
    });

    it("should call the callback function", function() {
      FB.getLoginStatus(callbacks.getLoginStatus);
      expect(callbacks.getLoginStatus).toHaveBeenCalled();
    });

    describe("when the user is logged in", function() {
      beforeEach(function() {
        FBStub.loggedIn({userID: 123});
      });

      describe("when the user has authorized the application", function() {
        beforeEach(function() {
          FBStub.connected();
        });

        it("should yield a hash with a connected response", function() {
          FB.getLoginStatus(callbacks.getLoginStatus);
          expect(callbacks.getLoginStatus).toHaveBeenCalledWith({
            status : 'connected',
            authResponse: {
              accessToken: '',
              expiresIn: 4095,
              signedRequest: '',
              userID: 123
            }
          });
        });
      });

      describe("when the user has not authorized the application", function() {
        beforeEach(function() {
          FBStub.notConnected();
        });

        it("should yield a hash with an unauthorized status", function() {
          FB.getLoginStatus(callbacks.getLoginStatus);
          expect(callbacks.getLoginStatus).toHaveBeenCalledWith({
            status: 'not_authorized',
            authResponse: null
          });
        })
      });
    });

    describe("when the user is not logged in", function() {
      beforeEach(function() {
        FBStub.notLoggedIn();
      });

      it("should yield a hash an unknown status", function() {
        FB.getLoginStatus(callbacks.getLoginStatus);
        expect(callbacks.getLoginStatus).toHaveBeenCalledWith({
          status: 'unknown',
          authResponse: null
        });
      })
    });
  });
});
