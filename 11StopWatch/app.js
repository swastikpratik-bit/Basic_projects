let [sec, min , hrs] = [0,0,0]  ;
let displayTime = document.getElementById("displayTime");
let timer = null;
function stopwatch(){
    sec++;
    if(sec == 60){
        sec = 0;
        min++;
        if(min== 60){
            min = 0 ;
            hrs++;
        }
    }
    
    let h = hrs < 10 ? "0" + hrs : hrs  ;
    let m = min < 10 ? "0" + min : min  ;
    let s = sec < 10 ? "0" + sec : sec  ;

    displayTime.innerHTML = h + ":" + m + ":" + s;
}

function watchStart(){
    if(timer!== null){
        clearInterval(timer);
    }
    timer = setInterval(stopwatch, 1000);
}


function watchStop(){
    clearInterval(timer);
}
function watchReset(){
    clearInterval(timer);
    [sec, min , hrs] = [0,0,0]  ;
    displayTime.innerHTML = "00:00:00";
}