const https = require('https');

// Generally promise doesnot return data. It is like a contract when the program execution starts, it promises
// to return something in the future either data or error once the execution is completed.
function fetchData(url){
    // New promise was defined here
    const promiseToken = new Promise((resolve,reject) => {
        https.get(url, (response) => {
            let data = "";
            response.on('data', (rd) => data = data + rd );
            response.on('end', () => resolve(data));
        });
    });
    // Promise is returned here
    return promiseToken;
}

console.log('Program started');
// The moment control encounters the await keyword, then program waits for the function to be completed. Parallely the another control
// keeps the program still in execution. This way it doesnot block the UI of program.
// Also no need to call the then function.
async function read(url){
    const data = await fetchData(url);
    console.log(data.length);
}

read("https://www.javascript.com/");

console.log('Program Ended');