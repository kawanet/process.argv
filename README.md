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
  require("fs").createReadStream(__dirname + "/help.md").pipe(process.stderr);
  process.exit(1);
}

// rest of CLI arguments
var files = config["--"] || [];
files.forEach(function(file) {
  console.log(file);
});
```

## FAQ

Q. Shortcut name such as `-f`, instead of `--force`?

A. Use more readable name `--force` at the 21st century.

Q. Built-in help message feature?

A. Prepare documentation file which is more useful for users.

Q. Space separator `--foo bar`, instead of equal separator `--foo=bar`?

A. It's not supported as this module which prefers less configuration.

Q. Using character `-` itself within a parameter key name?

A. Escape special characters: `%2D` for `-`. `%3D` for `=`. `%25` for `%`.

Q. Using character `.` within a parameter key name?

A. `.` is the special special character used internally. It's not available in a key.

## Install

```sh
npm install -g process.argv
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
