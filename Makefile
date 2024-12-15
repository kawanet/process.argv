#!/usr/bin/env bash -c make

ALL = process.argv.mjs test/20.test.mjs

all: $(ALL)

test: all
	./node_modules/.bin/mocha -R spec test/*.test.js
	./node_modules/.bin/mocha -R spec test/*.test.mjs

clean:
	rm -f $(ALL)

%.mjs: %.js Makefile
	cat < $< |\
	sed 's#^var obop =.*#import obopInit from "obop";\nconst obop = obopInit()#;' |\
	sed 's#^const assert = .*#import {strict as assert} from "assert";#;' |\
	sed 's#^const argv = .*#import argv from "../process.argv.mjs";#;' |\
	sed 's#__filename#"$@"#;' |\
	sed 's#^.*module.exports = *#export default #;' > $@

.PHONY: all clean test
