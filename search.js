'use strict';


var index;


// Sets up the index
//
function resetIndex () {
	index = window.lunr(function () {
		this.field('file');
		this.field('type');
		this.ref('path');
	});
}


// Adds a file to the index
//
// @param 	file 	{Object} 	The file record
//
function addToIndex (file) {
	index.add(file);
}


// finds results given a query
//
// @param	 query 	{String}	The search query
// @param	 cb 	{Function} 	The function to receive the results
//
function find (query, cb) {
	var results = index.search(query);
	cb(results);
}


// Expose the public API
//
module.exports = {
	addToIndex 		: addToIndex,
	find 			: find,
	resetIndex 		: resetIndex	
};