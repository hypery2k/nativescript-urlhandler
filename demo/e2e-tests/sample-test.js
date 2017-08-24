"use strict";
let nsAppium = require("nativescript-dev-appium");
let isAndroid = process.env.npm_config_runType.includes("android");
let isSauceRun = process.env.npm_config_sauceLab;
// CONFIG CONSTANTS
const OVERALL_TIMEOUT = 800000;
const WAIT_TIMEOUT = 100000;

describe("simple", function () {

  this.timeout(OVERALL_TIMEOUT);
  var driver;

  before(function () {
    driver = nsAppium.createDriver();
  });

  after(function () {
    if (isSauceRun) {
      driver.getSessionId().then(function (sessionId) {
        console.log("Report: https://saucelabs.com/beta/tests/" + sessionId);
      });
    }
    return driver
      .quit()
      .finally(function () {
        console.log("Driver quit successfully");
      });
  });

  it("should find an element", function () {
    return driver
      .waitForElementByAccessibilityId('tapButton', WAIT_TIMEOUT)
      .should.eventually.exist
      .tap()
      .elementByAccessibilityId("messageLabel")
      .should.eventually.exist;
  });
});
