'use strict';


// Dependencies
//
var fileSystem 		= require('./fileSystem');
var search 			= require('./search');
var userInterface 	= require('./userInterface');


// Loads the folder
//
function loadFolder (folderPath) {
	userInterface.clearMainArea();
	search.resetIndex();
	userInterface.updateCurrentFolder(folderPath);
	fileSystem.getFilesInFolder(folderPath, function (err, files) {

		if (files && files.length > 0) {

			files.forEach(function (file) { 
				userInterface.addFileToMainArea(file);
				search.addToIndex(file);
			});
			userInterface.makeFoldersClickable(function (event) {
				var folderPath = window.$(event.target).attr('data-filePath');
				loadFolder(folderPath);
			});

		}

	});

}


// Inserts the user's home folder into the current folder
//
window.onload = function () {
	loadFolder(fileSystem.getUsersHomeFolder());
	userInterface.bindSearchField(function (event) {
		var query = event.target.value;
		if (query === '') { 
			userInterface.resetFilter(); 
		} else {
			search.find(query, userInterface.filterResults);
		}
	});
};