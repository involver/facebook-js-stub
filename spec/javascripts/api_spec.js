describe("FB.api", function () {
  var callbacks;

  beforeEach(function () {
    callbacks = {
      api:function () {
      }
    };
    spyOn(callbacks, 'api');
  });

  describe("when FB has not been initialized", function () {
    beforeEach(function () {
      FB.api(callbacks.api);
    });

    it("should not call the callback function", function () {
      expect(callbacks.api).not.toHaveBeenCalled();
    });
  });

  describe("when FB has been initialized", function () {
    var response;

    function shared_callback_examples() {
      it("should match open requests", function() {
        expect(FBStub.findApiRequest("/some/path")).toBeDefined();
      });

      it("should not yet call the callback function", function() {
        expect(callbacks.api).not.toHaveBeenCalled();
      });

      describe("when the API response is triggered for the same path", function() {
        beforeEach(function() {
          FBStub.respondToApiRequest("/some/path", response);
        });

        it("should yield the response to the callback function", function() {
          expect(callbacks.api).toHaveBeenCalledWith(response);
        });
      });

      describe("when the API response is triggered for a different path", function() {
        beforeEach(function() {
          FBStub.respondToApiRequest("/another/path", response);
        });

        it("should not yet call the callback function", function() {
          expect(callbacks.api).not.toHaveBeenCalled();
        });
      });
    }

    describe("when given path and callback params", function() {
      beforeEach(function () {
        FB.init({appId:123});
        FB.api("/some/path", callbacks.api);

        response = {
          data: [
            {
              name: "Example",
              access_token: "",
              category: "Community",
              id: "1234567890"
            }
          ]
        };
      });

      shared_callback_examples();
    });

    describe("when given path, object, and callback params", function() {
      var myObj = { };

      beforeEach(function () {
        FB.init({appId:123});
        FB.api("/some/path", myObj, callbacks.api);

        response = {
          data: [
            {
              name: "Example",
              access_token: "",
              category: "Community",
              id: "1234567890"
            }
          ]
        };
      });

      shared_callback_examples();
    });
  });
});
