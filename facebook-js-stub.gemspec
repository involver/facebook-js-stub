# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'facebook-js-stub/version'

Gem::Specification.new do |s|
  s.name        = "facebook-js-stub"
  s.version     = FacebookJsStub::VERSION
  s.authors     = ["Involver", "Brian Norton"]
  s.summary     = "A mocking framework for the FB javascript library."

  s.files       = Dir.glob("{lib,spec,src,vendor}/**/*") + %w(Gemfile MIT-LICENSE Rakefile README.md)
end
