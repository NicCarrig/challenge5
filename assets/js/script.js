//first element is the date, all subsequent elements should be objects with a timeslot and description
var tasks = [];

function loadTasks(){
    //set current day and populate the time-blocks with the descriptions
    //if the date in localstorage is different than current date, wipe the saved descriptions
    var todayDate = moment().format("dddd, MMMM Do");
    var checkTasks = JSON.parse(localStorage.getItem("tasks"));

    if(checkTasks === null){
        tasks[0] = todayDate;
        saveDesc();
        makeTaskArray();
        loadTasks();
    }
    else if (todayDate != tasks[0]){
        clearDesc();
        loadTasks();
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
function checkTime(){
    var currentTime = moment().hour();
}
function makeTaskArray(){
    console.log("make array function");
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

    saveDesc();
}

function findTimeslot(){
    //returns index of button clicked so the correct element in the array can be changed
    var index;
}

$(".time-block").on("click", "button", function(){

    var text = $(this).siblings(".description").val();
    var timeSlot = $(this).parent().attr("id");

    updateDesc(text, timeSlot);

});

// $.each($(".time-block"), function(){
//     var blockId = ($(this).attr("id"));
//     var blockDesc = ($(this).find(".description").val());
//     var blockObj = {
//         time: blockId,
//         desc: blockDesc
//     };
//     tasks.push(blockObj);
// })
// localStorage.setItem("tasks", JSON.stringify(tasks));

var time = moment().hour();
console.log(time);
loadTasks();
console.log(tasks);
// saveDesc();