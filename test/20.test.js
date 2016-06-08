#!/usr/bin/env mocha

var assert = require("assert");

var dotargv = require("../process.argv");

var TITLE = __filename.replace(/^.*\//, "");

describe(TITLE, function() {
  var SAMPLE_ARGS = ["aaa", "--bbb=ccc", "--ddd", "--eee-fff=ggg", "--hhh-iii", "jjj", "--kkk-lll-mmm=nnn", "--", "ooo", "--", "ppp"];

  var SAMPLE_CONFIG = {
    bbb: "CCC",
    ddd: "DDD",
    eee: {
      fff: "GGG"
    },
    hhh: {
      iii: "III"
    },
    kkk: {
      lll: {
        mmm: "NNN"
      }
    },
    qqq: "QQQ"
  };

  it("argv([...])()", function() {
    var argv = dotargv(SAMPLE_ARGS);
    var config = argv(); // empty
    assert.equal(config.bbb, "ccc");
    assert.equal(config.ddd, true);
    assert.equal(config.eee.fff, "ggg");
    assert.equal(config.hhh.iii, true);
    assert.equal(config.kkk.lll.mmm, "nnn");
    assert.equal(config.qqq, null);
    assert.ok(config["--"]);
    assert.ok(config["--"] instanceof Array);
    assert.equal(config["--"].join(","), ["aaa", "jjj", "ooo", "--", "ppp"].join(","));
  });

  it("argv([...])({...})", function() {
    var argv = dotargv(SAMPLE_ARGS);
    var config = JSON.parse(JSON.stringify(SAMPLE_CONFIG)); // deep clone
    config = argv(config);
    assert.equal(config.bbb, "ccc");
    assert.equal(config.ddd, true);
    assert.equal(config.eee.fff, "ggg");
    assert.equal(config.hhh.iii, true);
    assert.equal(config.kkk.lll.mmm, "nnn");
    assert.equal(config.qqq, "QQQ");
  });

  it("argv()({...})", function() {
    var argv = dotargv(); // empty
    var config = JSON.parse(JSON.stringify(SAMPLE_CONFIG)); // deep clone
    config = argv(config);
    assert.equal(config.bbb, "CCC");
    assert.equal(config.ddd, "DDD");
    assert.equal(config.eee.fff, "GGG");
    assert.equal(config.hhh.iii, "III");
    assert.equal(config.kkk.lll.mmm, "NNN");
    assert.equal(config.qqq, "QQQ");
  });

  it("argv([file])()", function() {
    var argv = dotargv(["aaa"]);
    var config = argv();
    assert.ok(config["--"]);
    assert.ok(config["--"] instanceof Array);
    assert.equal(config["--"].join(","), ["aaa"].join(","));
  });
});

// ================================