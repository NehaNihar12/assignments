/**
 * ## Create a counter in JavaScript
 * We have already covered this in the second lesson, but as an easy recap try to code a counter in Javascript
 * It should go up as time goes by in intervals of 1 second
 */

const counter = () =>{
    let counter = 1
    console.log(counter);
    let timerId = setInterval(()=> {
        console.log(++counter);
        // if (counter === 5) {
        //     clearInterval(timerId); // Clear the interval
        //     console.log('Counter stopped.');
        // }
    },1000);
}
counter();