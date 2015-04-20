/**
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// Work around a potential npm race condition:
// https://github.com/npm/npm/issues/6624
function requireSelenium(done, attempt) {
  attempt = attempt || 0;
  var selenium;
  try {
    selenium = require('selenium-standalone');
  } catch (error) {
    if (attempt > 3) { throw error; }
    setTimeout(
      requireSelenium.bind(null, done, attempt + 1),
      Math.pow(2, attempt) // Exponential backoff to play it safe.
    );
  }
  // All is well.
  done(selenium);
}

var config = {
  logger:  console.log.bind(console),
};

requireSelenium(function(selenium) {
  selenium.install(config, function(error) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
  });
});
