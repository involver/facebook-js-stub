describe("FB.login", function() {
  var callbacks;

  beforeEach(function() {
    callbacks = {
      login: function() {}
    };
    spyOn(callbacks, 'login');
  });

  describe("when FB has not been initialized", function() {
    beforeEach(function() {
      FB.login(callbacks.login);
    });

    describe("when the user logs in and authorizes the application", function() {
      beforeEach(function() {
        FBStub.logInAndAuthorize();
      });

      it("should not call the callback function", function() {
        expect(callbacks.login).not.toHaveBeenCalled();
      });
    });

    describe("when the user does not log in or authorize the application", function() {
      beforeEach(function() {
        FBStub.logInAndDeny();
      });

      it("should not call the callback function", function() {
        expect(callbacks.login).not.toHaveBeenCalled();
      });
    });

    describe("when the user does not log in", function() {
      beforeEach(function() {
        FBStub.abortLogIn();
      });

      it("should not call the callback function", function() {
        expect(callbacks.login).not.toHaveBeenCalled();
      });
    });
  });

  describe("when FB has been initialized", function() {
    beforeEach(function() {
      FB.init({appId: 123});
      FB.login(callbacks.login);
    });

    it("should not yet call the callback function", function() {
      expect(callbacks.login).not.toHaveBeenCalled();
    });

    describe("when the user logs in and authorizes the application", function() {
      beforeEach(function() {
        FBStub.logInAndAuthorize();
      });

      it("should yield an object with an authorized response", function() {
        expect(callbacks.login).toHaveBeenCalledWith({
          status: "connected",
          authResponse: {
            accessToken: "",
            userID: "",
            expiresIn: 4374,
            signedRequest: ""
          }
        });
      });
    });

    describe("when the user logs in and does not authorize the application", function() {
      beforeEach(function() {
        FBStub.logInAndDeny();
      });

      it("should yield an object with an authorized status", function() {
        expect(callbacks.login).toHaveBeenCalledWith({
          status: "not_authorized",
          authResponse: null
        });
      });
    });

    describe("when the user does not log in", function() {
      beforeEach(function() {
        FBStub.abortLogIn();
      });

      it("should yield an object with an unknown status", function() {
        expect(callbacks.login).toHaveBeenCalledWith({
          status: "unknown",
          authResponse: null
        });
      });
    });
  });
});
