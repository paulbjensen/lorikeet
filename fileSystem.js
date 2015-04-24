'use strict';


// Dependencies
//
var async	= require('async');
var fs 		= require('fs');
var osenv 	= require('osenv');
var path 	= require('path');


// Gets the user's home folder
//
// @return {String} The path of the home folder
//
function getUsersHomeFolder () {
  	return osenv.home();
}


// Determines the file type, and returns an object
// describing the file 
//
function inspectAndDescribeFile (filePath, cb) {

	var result = {file: path.basename(filePath), path: filePath, type: ''};

	fs.stat(filePath, function (err, stat) {

		if (err) { cb(err); }

		if (stat.isFile()) { result.type = 'file'; }
		if (stat.isDirectory()) {result.type = 'directory'; }

		cb(err,result);

	});

}


// Retrieves the files in the folder, and 
// determines what they are
//
// @param 	dir 	{String}		The directory we want to list files for
// @param 	cb 		{Function} 		The function that will receive the list of files	
//
function getFilesInFolder (folderPath, cb) {

	fs.readdir(folderPath, function (err, files) {

		if (err) { cb(err); }

		async.map(files, function (file, internalCb) {
			var resolvedFilePath = path.resolve(folderPath,file);
			inspectAndDescribeFile(resolvedFilePath, internalCb);
		}, cb);

	});

}


// Expose the functions as the public API
//
module.exports = {
	getFilesInFolder 		: getFilesInFolder,
	getUsersHomeFolder 		: getUsersHomeFolder
};