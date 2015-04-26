'use strict';


// Dependencies
//
var path = require('path');


// Insert's the current folder 
// into the current folder UI element
//
// @param 	folderPath 	String 	The path of the folder
//
function updateCurrentFolder (folderPath) {
	window.$('#current-folder').html(convertFolderPathIntoLinks(folderPath));
}


// Converts a string into a collection of links
//
// @param 	folderPath 	String 	The path of the folder
//
function convertFolderPathIntoLinks (folderPath) {

	var folders 		= folderPath.split(path.sep);
	var contents 		= [];
	var pathAtFolder 	= '';
	folders.forEach(function (folder) {
		pathAtFolder += folder + path.sep;
		contents.push('<span class="path" data-path="' + pathAtFolder.slice(0,-1) + '">' + folder + '</span>'); 
	});
	return contents.join(path.sep).toString();

}


// Appends the file to the main area in the app
//
// @param	 file 	{Object} 		The file
//
function addFileToMainArea (file) {
	var mainArea = window.document.getElementById('main-area');
	var template = window.document.querySelector('#item-template');
	template.content.querySelector('img').src = 'images/' + file.type + '.svg';
	template.content.querySelector('img').classList.add(file.type);
	template.content.querySelector('img').setAttribute('data-filePath',file.path);
	template.content.querySelector('.filename').innerText = file.file;
	var clone = window.document.importNode(template.content, true);
    mainArea.appendChild(clone);
}


// Makes the folders clickable
//
// @param 	cb 		{Function} 		The function to execute when the double-click happens
//
function makeFoldersClickable (cb) {
	window.$('.directory').on('dblclick', cb);
}


// Clears the main area of any content
//
function clearMainArea () {
	window.$('#main-area').html('');
}


// Attaches to the search field in the toolbar
//
// @param 	cb 		{Function} 		The function to execute when the key is pressed
//
function bindSearchField (cb) {
	window.$('#search').on('keyup', cb);
}


// Binds the clickable folders in the current folder path area
//
// @param 	cb 		{Function} 		The function to execute on the folder path
//
function bindCurrentFolderPath (cb) {
	window.$('span.path').on('click', function (event) {
		var folderPath = window.$(event.target).attr('data-path');
		cb(folderPath);
	});
}


// Filters the results in the main area
//
// @param 	results 	{Array}		The list of results
//
function filterResults (results) {
	var validFilePaths = results.map(function (result) { return result.ref; });
	window.$('.item').each(function (index, item) {
		var filePath = window.$(window.$(item).find('img')).attr('data-filePath');
		if (validFilePaths.indexOf(filePath) !== -1) {
			window.$(item).show();
		} else {
			window.$(item).hide();
		}
	});
}


// Resets the display of the files in the main area
//
function resetFilter () {
	window.$('.item').show();
}

// Expose the functions as the public API
//
module.exports = {
	addFileToMainArea 		: addFileToMainArea, 
	updateCurrentFolder 	: updateCurrentFolder,
	makeFoldersClickable	: makeFoldersClickable,
	clearMainArea 			: clearMainArea,
	bindSearchField 		: bindSearchField,
	bindCurrentFolderPath 	: bindCurrentFolderPath,
	filterResults			: filterResults,
	resetFilter 			: resetFilter
};