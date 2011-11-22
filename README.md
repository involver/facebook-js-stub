# Facebook JS Stub

## Description

This library facilitates the testing of code that interacts with Facebook via the official JavaScript SDK. It does this
by providing a fake `FB` JavaScript module that mimics the official module. It also provides helper methods for
simulating different Facebook states.

## Install

### Jasmine on Rails 3.1

If using the edge version of [Jasmine](http://pivotal.github.com/jasmine/) with the Rails 3.1 asset pipeline:

1. Add the gem to your Gemfile:

        gem "facebook-js-stub", :git => "git://github.com/involver/facebook-js-stub.git"

2. Add the `facebook-js-stub.js` asset to your `src_files` in `spec/javascripts/support/jasmine.yml`:

        src_files:
          - ...
          - assets/facebook-js-stub.js

### Jasmine on another project

1. Copy `vendor/assets/javascripts/facebook-js-stub.js` to `spec/javascripts/helpers/`.
2. If you're explicitly setting helpers in your Jasmine configuration, add the new file:

        helper_files:
          - ...
          - helpers/facebook-js-stub.js

## Usage

`FB` is a module that simulates the official Facebook JavaScript library.

`FBStub` is a module that provides methods for simulating a user's Facebook state and for simulating calls from
Facebook to your callbacks.

### FB.init(options)

As with the official Facebook library, you need to initialize it with your Application ID before anything else. Add the
following in a `beforeEach`:

    FB.init({appId: 123});

### FB.getLoginStatus(callback)

The given callback is called immediately and synchronously using the user's Facebook state as set via `FBStub`.

See `FBStub.loggedIn()`, `FBStub.notLoggedIn()`, `FBStub.connected()`, and `FBStub.notConnected()`.

### FB.api(path, callback)

The given request is recorded. The `callback` is not immediately called but stored for later use.

To trigger a simulated response from Facebook, see `FBStub.respondToApiRequest()`.

### FBStub.loggedIn(userId)

This simulates a logged in user.

### FBStub.notLoggedIn()

This simulates a logged out user.

### FBStub.connected()

This simulates a user having authorized the current application.

### FBStub.notConnected()

This simulates a user having not authorized the current application.

### FBStub.respondToApiRequest(path, response)

This responds to a previously recorded `FB.api()` request matching the given `path`. It will synchronously call the
stored callback with the given `response`.

## Notes

* When using `facebook-js-stub.js`, do not include Facebook's official JavaScript library. They both use the `FB`
  namespace, so one will override the other.

## License

Please see the included license file.
