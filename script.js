// Global Variables
let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
let alarmCount = 0;
let alarmTime;
let ring=new Audio("./Audio/ringtone.mp3");


// Digital Clock 
function updateClock()
{
    var hours= document.getElementById('hours');
    var minuts= document.getElementById('minuts');
    var seconds= document.getElementById('seconds');
    var period= document.getElementById('period');

    // geting hour, minute and second from system
    var hour = new Date().getHours();
    var minute = new Date().getMinutes();
    var second = new Date().getSeconds();
    var ampm="AM";
        
    if(hour >= 12)
    {
        hour=hour-12;
        ampm="PM";
    }
    //if hour value is 0 then set this value to 12
    hour = (hour===0) ? hour=12 : hour;

    // adding zero before hour, minut, second if this value is less than 10
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    // value assign 
    hours.innerHTML = hour;
    minuts.innerHTML = minute;
    seconds.innerHTML = second;
    period.innerHTML = ampm;

    // if any alarm is present in upcomping alarm list the this function will call  
    if(alarmListArr.length>0)
    {
        ringAlarm(hour, minute, second, ampm);
    }
}

setInterval("updateClock()",1000);


// Ring alarm function
function ringAlarm(hour, minute, second, ampm)
{
    for(let i=0; i<alarmListArr.length;i++)
    {
        if(alarmListArr[i]==`${hour}:${minute}:${second} ${ampm}`)
        {
            // calling audio function
            ring.load();
            ring.play();    
            document.querySelector("#stopAlarm").style.visibility = "visible";
        }
    }
}

// Set alarm section

// for hour
for(let i=12; i>0; i--)
{
    i= i<10 ? "0"+i : i;
    let option = `<option value = "${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// for minute
for(let i=59;i>=0;i--)
{
    i = i<10 ? "0"+i : i;
    let option = `<option value = "${i}"> ${i} </option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option); 
}

// for second dropDown list

for(let i=59;i>=0;i--)
{
    i = i<10 ? "0"+i : i;
    let option = `<option value = "${i}"> ${i} </option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option); 
}

// for time period dropDown list
for(let i=2;i>0;i--)
{
    let ampm = i==1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}


// Code for add alarm

function setAlarm()
{
    document.querySelector("#alarm-h3").innerText = "Upcoming Alarms";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
    
    //checking for right input from user  
    if(time.includes("setHour") || time.includes("setMinute") || time.includes("setSecond") || time.includes("AM/PM"))
    {
        alert("Please, Select Valid Input");
    }
    else
    {
        alarmCount++;
        document.querySelector(".alarmList").innerHTML +=`
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime= `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector(".btn-delete").value);

    }
}
setAlarmBtn.addEventListener("click", setAlarm);

// Alarm Delete Function

function deleteAlarm(click_id){
    var element = document.getElementById("alarm"+click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
    element.remove();
}

// Alarm Stop Function

function stopAlarm()
{
    ring.pause();
    document.querySelector("#stopAlarm").style.visibility= "hidden";
}
