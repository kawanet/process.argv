# process.argv.js

light-weight command line arguments parser for cli application

## Synopsis

```sh
#!/usr/bin/env node

var argv = require("process.argv")(process.argv.slice(2));

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
  var cmd = process.argv[1].replace(/^.*\//, "");
  console.warn("Usage: " + cmd + " --foo=AAA --bar.buz=BBB");
  process.exit(1);
}

// rest of CLI arguments
var files = config["--"] || [];
files.forEach(function(file) {
  console.log(file);
});
```

## Install

```sh
npm install -g kawanet/process.argv
```

## Repository

- [https://github.com/kawanet/process.argv](https://github.com/kawanet/process.argv)

## License

The MIT License (MIT)

Copyright (c) 2016 Yusuke Kawasaki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
