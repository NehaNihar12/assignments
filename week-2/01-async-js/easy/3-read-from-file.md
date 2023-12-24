## Reading the contents of a file

Write code to read contents of a file and print it to the console. 
You can use the fs library to as a black box, the goal is to understand async tasks. 
Try to do an expensive operation below the file read and see how it affects the output. 
Make the expensive operation more and more expensive and see how it affects the output. 

Notes while reading the contents of a file:

// Set the current working directory to the directory of the script in order to
// read file from ./Demo.txt 
// or use absolute paths instead like path.join(__dirname, 'Demo.txt')
process.chdir(__dirname);

// Use fs.readFile() method to read the file 
/**
 * When you provide a relative path like ./Demo.txt,
 * it is relative to the current working directory of the process.
 * The current working directory may not be the same as the directory 
 * where your script is located.
 */
fs.readFile('./Demo.txt', 'utf8', function(err, data){ })

