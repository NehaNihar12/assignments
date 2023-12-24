function removeExtraSpaceFromFileData(){
    // 1st read the file
    const fs = require('fs');
    const path = require('path');

    fs.readFile(path.join(__dirname,'input.txt'),'utf8', (err, data) => {
        if(data){
            // remove extra spaces from the file data
            const formattedStr = removeSpaceFromString(data);
            // write the data back to same file.
            fs.writeFile(path.join(__dirname,'input.txt'),formattedStr,'utf8'
            , (err) => {
                if(err){
                    console.error('error in writing data ', err);   
                }else{
                    console.log('file written successfully');
                }
            } )
        }else{
            console.error('error in reading data '+err);
        }    
    })
}

removeExtraSpaceFromFileData();

// function to remove extra spaces in a string
const removeSpaceFromString = (s) => {

    return s.replace(/\s+/g, ' ').trim();
}

