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

// Once the promise is returned then we use then function to play on the data
const promiseToken = fetchData("https://www.javascript.com/");
promiseToken.then((data) =>{
    console.log(data.length);
});

console.log('Program Ended')