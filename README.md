# keybench [![Build Status](https://travis-ci.org/peferron/keybench.svg?branch=master)](https://travis-ci.org/peferron/keybench) [![npm](https://img.shields.io/npm/v/keybench.svg)](https://www.npmjs.com/package/keybench)

Keybench evaluates the keystroke efficiency of keyboard layouts against your own input files.

```shell
$ keybench my-project/*.rs

1) French AZERTY
  - 0 characters cannot be typed
  - 15999 characters can be typed in 17700 keystrokes (avg 1.106 keystrokes per character)

2) United States ANSI QWERTY
  - 0 characters cannot be typed
  - 15999 characters can be typed in 19072 keystrokes (avg 1.192 keystrokes per character)
```

### Installation

```shell
npm install -g keybench
```

Keybench has [zero dependencies](./package.json).

### Usage

```shell
$ keybench --help

Usage:
  keybench [layout...] [--] file...

Options:
  -h, --help  Show help

Examples:
  # Benchmark all built-in layouts against sample.go and sample.scala
  keybench sample.go sample.scala

  # Benchmark all built-in layouts plus mylayout1 and mylayout2 against sample.go
  keybench mylayout1.json mylayout2.json -- sample.go

  # Benchmark all built-in layouts against stdin
  keybench -
```

### Contribution

Built-in layouts are located in the [`layouts`](./layouts) directory. The JSON structure should be self-explanatory; just make sure that the length of the `modifiers` array is equal to the number of extra keystrokes required to input the characters.

Pull requests for new layouts or improvements to Keybench are appreciated!
