//first element is the date, all subsequent elements should be objects with a timeslot and description
var tasks = [];

function loadTasks(){
    //set current day and populate the time-blocks with the descriptions
    //if the date in localstorage is different than current date, wipe the saved descriptions
    var todayDate = moment().format("dddd, MMMM Do");
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if(tasks === null){
        tasks = [];
        tasks.push(todayDate);
        saveDesc();
        makeTaskArray();
        loadTasks();
    }
    else if (todayDate != tasks[0]){
        clearDesc();
        loadTasks();
    }

    //populate descriptions from local storage 
    //starts at 1 because the date is in element [0]
    for(var i = 1; i < tasks.length; i++){
        var tempDesc = tasks[i].desc;
        var tempTime = tasks[i].time;
        updateDesc(tempDesc, tempTime);
    }
    $("#currentDay").text(todayDate);
}
function saveDesc(){
    // console.log(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function clearDesc(){
    //clear storage and recall loadTasks to make date at the top
    localStorage.clear();
    loadTasks();
}
function makeTaskArray(){
    //makes an object array

    $.each($(".time-block"), function(){
        var blockId = ($(this).attr("id"));
        var blockDesc = ($(this).find(".description").val());
        var blockObj = {
            time: blockId,
            desc: blockDesc
        };
        tasks.push(blockObj);
    })
    saveDesc();
}

function updateDesc(text, timeSlot){
    //finds the timeslot of the button clicked and then updates that description
    var index = findTimeslot(timeSlot);
    tasks[index].desc = text;
    console.log(text +" : "+ timeSlot);
    
    var idString = "#" + timeSlot + " .description";
    $(idString).text(text);

    saveDesc();
}

function findTimeslot(timeSlot){
    //returns index of button clicked so the correct element in the array can be changed
    var index = 0;
    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].time === timeSlot){
            index = i;
        }
    }
    
    return index;
}

$(".time-block").on("click", "button", function(){
    
    var text = $(this).siblings(".description").val();
    var timeSlot = $(this).parent().attr("id");
    // console.log(text, timeSlot);
    updateDesc(text, timeSlot);
    
});


function checkTime(){
    var currentTime = moment().hour();
}


var time = moment().hour();
console.log(time);
loadTasks();
console.log(tasks);
// saveDesc();