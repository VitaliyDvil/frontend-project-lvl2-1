# frontend-project-lvl2
[![Maintainability](https://api.codeclimate.com/v1/badges/00e32e6f7a722adcacf4/maintainability)](https://codeclimate.com/github/looleeluu/frontend-project-lvl2/maintainability)
[![Node CI](https://github.com/looleeluu/frontend-project-lvl2/workflows/Node%20CI/badge.svg?event=push)](https://github.com/looleeluu/frontend-project-lvl2/actions)
[![Test Coverage](https://api.codeclimate.com/v1/badges/00e32e6f7a722adcacf4/test_coverage)](https://codeclimate.com/github/looleeluu/frontend-project-lvl2/test_coverage)

## Description

***gendiff*** - a program defining the difference between two data structures. It is a popular task, for which there are many online services http://www.jsondiff.com/.

## Features

* support for different input formats: yaml, json, ini
* report generation as plain text, stylish и json

## Setup

```
$ git clone https://github.com/looleeluu/frontend-project-lvl2.git
$ cd frontend-project-lvl2/
$ make install
$ make link
```

## Usage
```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```

## gendiff with stylish formatter(default):

[![asciicast](https://asciinema.org/a/367813.svg)](https://asciinema.org/a/367813)

## gendiff with plain formatter:
[![asciicast](https://asciinema.org/a/367814.svg)](https://asciinema.org/a/367814)

## gendiff with json formatter:
[![asciicast](https://asciinema.org/a/370394.svg)](https://asciinema.org/a/370394)
