// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs');
const path = require('path');

// Data to be written to the file
const content = 'Hello, this is the content to be written to the file!';

// Specify the file path
const filePath = path.join(__dirname,'./output.txt');

// Use fs.writeFile() to write to the file
fs.writeFile(filePath, content, 'utf8', function(err) {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('File has been written successfully!');
    }
});

