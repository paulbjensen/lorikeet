'use strict';


// Dependencies
//
var assert 						= require('assert');
var path							= require('path');
var wd 								= require('wd');
var nw								= require('nw');
var WebdriverManager 	= require('webdriver-manager');

describe('app', function () {

	describe('toolbar', function () {

		describe('search field', function () {

			describe('when searching for a file', function () {

				var wm, browser;
				before(function (done) {
					this.timeout(20000);
					wm = new WebdriverManager();
					wm.start({closeOnStdinInput: false}, function (err) {
						if (err) { return done(err); }
						browser = wd.remote();
						browser.init({
						  browserName: 'chrome',
						  chromeOptions: {
						    binary: path.join(__dirname, '../node_modules/.bin/nw')
						  }
						}, done);
					});

				});

				after(function (done) {
					this.timeout(20000);
					browser.close(function () {
						browser.quit(function () {
							done();
						});
					});
				});

				it('should filter the files that are displayed in the main area', function (done) {

					browser.elementById('search', function (err,element) {
						assert.equal(null, err);
						element.type('docu', function (error) {
							assert.equal(null, error);
							browser.elementByXPath('//div[contains(@class,"filename") and contains(text(),"Documents")]', function (err, element) {
								assert.equal(null, err);
								element.isDisplayed(function (error, isDisplayed) {
									assert.equal(null, error);
									assert(isDisplayed);
									browser.elementByXPath('//div[contains(@class,"filename") and contains(text(),".docker")]', function (err, element) {
										assert.equal(null, err);
										element.isDisplayed(function (error, isDisplayed) {
											assert.equal(null, error);
											assert(!isDisplayed);
											done();
										});
									});
								});
							});
						});
					});

				});

			});

		});

	});

});
