#!/usr/bin/env mocha

const assert = require("assert");

const argv = require("../process.argv");

const TITLE = __filename.replace(/^.*\//, "");

describe(TITLE, function() {
  const SAMPLE_ARGS = ["aaa", "--bbb=ccc", "--ddd", "--eee-fff=ggg", "--hhh-iii", "jjj", "--kkk-lll-mmm=nnn", "--", "ooo", "--", "ppp"];

  const SAMPLE_CONFIG = {
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
    const processArgv = argv(SAMPLE_ARGS);
    const config = processArgv(); // empty

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
    const processArgv = argv(SAMPLE_ARGS);
    const defaults = JSON.parse(JSON.stringify(SAMPLE_CONFIG)); // deep clone
    const config = processArgv(defaults);

    assert.equal(config.bbb, "ccc");
    assert.equal(config.ddd, true);
    assert.equal(config.eee.fff, "ggg");
    assert.equal(config.hhh.iii, true);
    assert.equal(config.kkk.lll.mmm, "nnn");
    assert.equal(config.qqq, "QQQ");
  });

  it("argv()({...})", function() {
    const processArgv = argv(); // empty
    const defaults = JSON.parse(JSON.stringify(SAMPLE_CONFIG)); // deep clone
    const config = processArgv(defaults);

    assert.equal(config.bbb, "CCC");
    assert.equal(config.ddd, "DDD");
    assert.equal(config.eee.fff, "GGG");
    assert.equal(config.hhh.iii, "III");
    assert.equal(config.kkk.lll.mmm, "NNN");
    assert.equal(config.qqq, "QQQ");
  });

  const A4 = ["file"];
  it("argv(" + JSON.stringify(A4) + ")()", function() {
    const processArgv = argv(A4);
    const config = processArgv();

    assert.ok(config["--"]);
    assert.ok(config["--"] instanceof Array);
    assert.equal(config["--"].join(","), A4.join(","));
  });

  const A5 = "--%25=1 --%2D=2 --%3D=3".split(" ");
  it("argv(" + JSON.stringify(A5) + ")()", function() {
    const processArgv = argv(A5);
    const config = processArgv();

    assert.equal(config["%"], 1);
    assert.equal(config["-"], 2);
    assert.equal(config["="], 3);
  });
});

// ================================
