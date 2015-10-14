'use strict';


var assert	= require('assert');
var lunr   	= require('../bower_components/lunr.js/lunr.js');
var search 	= require('../search');

global.window = {};
global.window.lunr = lunr;


describe('search', function () {

	describe('#find', function () {

		it('should return results when a file matches a term', function (done) {

			var seedFileReferences = [
				{file: 'john.png', type: 'image/png', path: '/Users/pauljensen/Pictures/john.png'},
				{file: 'bob.png', type: 'image/png', path: '/Users/pauljensen/Pictures/bob.png'},
				{file: 'frank.png', type: 'image/png', path: '/Users/pauljensen/Pictures/frank.png'}
			];

			search.resetIndex();
			seedFileReferences.forEach(search.addToIndex);

			search.find('frank', function (results) {
				assert(results.length === 1);
				assert.equal(seedFileReferences[2].path, results[0].ref);
				done();
			});

		});

	});

});