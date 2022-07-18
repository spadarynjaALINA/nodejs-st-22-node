"use strict";

process.stdin.on('data', function (string) {
  process.stdout.write(string.toString().split('').reverse().join(''));
  process.stdout.write("\n");
});