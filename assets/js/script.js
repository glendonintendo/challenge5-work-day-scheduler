const dateEl = document.querySelector("#currentDay");
let descriptions = {};

const loadDescriptions = function () {
    descriptions = JSON.parse(localStorage.getItem("descriptions"));
    if (!descriptions) {
        descriptions = {};
    }
    
    for (const [key, value] of Object.entries(descriptions)) {
        $(`#${key}`).val(value);
    }
};

const saveDescriptions = function() {
    localStorage.setItem("descriptions", JSON.stringify(descriptions));
}

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

    descriptions[thisTime] = thisText;
    saveDescriptions();
})

setInterval(function() {
    auditDate();
    auditTasks();
}, 30000);

onStart();