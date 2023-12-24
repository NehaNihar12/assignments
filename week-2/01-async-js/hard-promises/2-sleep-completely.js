/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
    const myPromise = new Promise((resolve, reject) => {
        // Simulate an asynchronous operation
        setTimeout(() => {
            console.log('waiting to resolve...')
            resolve();
        }, milliseconds);
    });
    return myPromise;
}

async function main (){
    await sleep(3000);
    console.log('only runs after the sleep')
}
main();

module.exports = sleep;
