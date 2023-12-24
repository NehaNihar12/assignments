// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output. 

var fs = require('fs'); 
const path = require('path');
  
/**
 * or use absolute paths instead like path.join(__dirname, 'Demo.txt') or
 * Set the current working directory to the directory of the script 
 * in order to read file from ./Demo.txt before fs.readFile async call.
 *  */ 
// process.chdir(__dirname);

// Use fs.readFile() method to read the file 
fs.readFile(path.join(__dirname, 'Demo.txt'), 'utf8', function(err, data){ 
    // Display the file content 
    if(err){
        console.log('Error reading',err)
    }else{
        console.log(data);
    }
     
}); 
  
console.log('readFile called'); 