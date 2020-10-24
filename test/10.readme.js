#!/usr/bin/env mocha

const argv = require("../process.argv");
const processArgv = argv(process.argv.slice(2));

// apply CLI options onto defaults: --foo=AAA --bar-buz=BBB
const config = processArgv({
  foo: "AAA",
  bar: {
    buz: "BBB"
  }
});

// show help message if --help given
if (config.help) {
  require("fs").createReadStream(__dirname + "/help.md").pipe(process.stderr);
  process.exit(1);
}

// rest of CLI arguments
const files = config["--"] || [];
files.forEach(function(file) {
  // console.log(file);
});

// ================================

const TITLE = __filename.replace(/^.*\//, "");
describe(TITLE, function() {
  it("readme", function() {
    const assert = require("assert");
    assert.ok(config.foo);
    assert.ok(config.bar.buz);
  });
});

// ================================
