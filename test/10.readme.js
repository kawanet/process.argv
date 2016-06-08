#!/usr/bin/env mocha

var argv = require("../process.argv")(process.argv.slice(2));

// default options --foo=AAA --bar-buz=BBB
var config = {
  foo: "AAA",
  bar: {
    buz: "BBB"
  }
};

// apply options given on CLI arguments
config = argv(config);

// show help message if --help given
if (config.help) {
  require("fs").createReadStream(__dirname + "/help.md").pipe(process.stderr);
  process.exit(1);
}

// rest of CLI arguments
var files = config["--"] || [];
files.forEach(function(file) {
  // console.log(file);
});

// ================================

var TITLE = __filename.replace(/^.*\//, "");
describe(TITLE, function() {
  it("readme", function() {
    var assert = require("assert");
    assert.ok(config.foo);
    assert.ok(config.bar.buz);
  });
});

// ================================
