//first element is the date, all subsequent elements should be objects with a timeslot and description
var tasks = [];

function loadTasks(){
    //set current day and populate the time-blocks with the descriptions
    //if the date in localstorage is different than current date, wipe the saved descriptions
    var todayDate = moment().format("dddd, MMMM Do");
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if(tasks === null){
        tasks = [];
        tasks[0] = todayDate;
        console.log("null if-else");
        saveDesc();
    }
    else if(todayDate != tasks[0]){
        //clears all descriptions if the dates are different (presumably from a previous day)
        console.log("no match if-else");
        clearDesc();
    }
    //document.getElementById("currentDay").innerHTML = todayDate;
    $("#currentDay").text(todayDate);
}
function saveDesc(){
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

$(".time-block").on("click", "button", function(){

    var text = $(this).siblings(".description").val();
    console.log(text);
    var timeSlot = $(this).parent().attr("id");
    console.log(timeSlot);

});

var time = moment().hour();
console.log(time);
loadTasks();