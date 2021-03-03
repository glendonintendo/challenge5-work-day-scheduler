let dateEl = document.querySelector("#currentDay");

const auditDate = function() {
    let currentDate = moment().format('dddd, MMMM Do');
    dateEl.innerHTML = currentDate;
}

const auditTasks = function() {
    $(".description").each(function() {
        let time = moment($(this).attr("id"), "ha").set("minute", 59);

        $(this).removeClass("past present future");
        console.log($(this).attr("class"));

        if (moment().isAfter(time)) {
            $(this).addClass("past");
        } else if (Math.abs(moment().diff(time, "hour")) <= 0) {
            $(this).addClass("present");
        } else {
            $(this).addClass("future");
        }
    })
}

const onStart = function() {
    auditDate();
    auditTasks();
}

setInterval(function() {
    auditDate();
    auditTasks();
}, 30000);

onStart();

