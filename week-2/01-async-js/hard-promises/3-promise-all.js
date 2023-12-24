/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function wait1(t) {
  const p = new Promise((resolve) => {
    setTimeout(resolve, t*1000);
  });
  return p;
}

function wait2(t) {
  const p = new Promise((resolve) => {
    setTimeout(resolve, t*1000);
  });
  return p;
}

function wait3(t) {
  const p = new Promise((resolve) => {
    setTimeout(resolve, t*1000);
  });
  return p;
}

// The three promises (representing wait1(t1), wait2(t2), and wait3(t3)) 
// run in parallel, not sequentially.
// The completion time is determined by the longest-running promise, 
// not the sum of individual times.

function calculateTime(t1, t2, t3) {
    const start = Date.now();
    const p = Promise.all([wait1(t1), wait2(t2), wait3(t3)]).then(()=>{
        const end = Date.now();
        return end-start;
    })
    return p;
}

// call function to calculate time
async function main(){
  const time = await calculateTime(1,2,3);
  console.log(time/1000+" seconds");
}

main()

module.exports = calculateTime;
