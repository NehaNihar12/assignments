// create clock using setTimeout

const Timer = () =>{
    getCurrentTime();
    let timerId = setTimeout(()=> {Timer()},1000);
}
Timer();

// get the time from Date api in the given format
function getCurrentTime(){
    const now = new Date();

    // Format HH:MM::SS
    const hhmmss = `${padZero(now.getHours())}:${padZero(now.getMinutes())}:${padZero(now.getSeconds())}`;

    // Format HH:MM::SS AM/PM
    const hhmmssAMPM = `${padZero(now.getHours() % 12 || 12)}:${padZero(now.getMinutes())}:${padZero(now.getSeconds())} ${now.getHours() < 12 ? 'AM' : 'PM'}`;

    console.log(`Current Time (HH:MM::SS): ${hhmmss}`);
    console.log(`Current Time (HH:MM::SS AM/PM): ${hhmmssAMPM}`);
};

// pad zero for single digit time.
function padZero(value){
    return value < 10 ? `0${value}` : value;
};