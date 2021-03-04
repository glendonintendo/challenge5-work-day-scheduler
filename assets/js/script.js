const dateEl = document.querySelector("#currentDay");

const loadDescriptions = function () {
    for (const [key, value] of Object.entries(localStorage)) {
        $(`#${key}`).val(value);
    }
};

const auditDate = function() {
    let currentDate = moment().format('dddd, MMMM Do');
    dateEl.innerHTML = currentDate;
};

const auditTasks = function() {
    $(".description").each(function() {
        let time = moment($(this).attr("id"), "ha").set("minute", 59);

        $(this).removeClass("past present future");

        if (moment().isAfter(time)) {
            $(this).addClass("past");
        } else if (Math.abs(moment().diff(time, "hour")) <= 0) {
            $(this).addClass("present");
        } else {
            $(this).addClass("future");
        }
    })
};

const onStart = function() {
    loadDescriptions();
    auditDate();
    auditTasks();
};

$(".saveBtn").on("click", function() {
    let thisTime = $(this).siblings(".hour").text();
    let thisText = $(this).siblings(".description").val();

    localStorage.setItem(thisTime, thisText)
    console.log(localStorage[thisTime]);
})

setInterval(function() {
    auditDate();
    auditTasks();
}, 30000);

onStart();