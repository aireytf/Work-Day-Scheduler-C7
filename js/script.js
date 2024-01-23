
$(document).ready(function () {
    // Display current day at the top
   displayCurrentDay();
   function displayCurrentDay() {
    $("#currentDay").text(dayjs().format("D MMMM, YYYY"));
  }

// Load events on page load
loadEvents();

// Save button click event
$(".saveBtn").on("click", function () {
    var hour = $(this).data("hour");
    var eventText = $(this).siblings(".event-container").children(".event-input").val();

// Save the event in localStorage
saveEvent(hour, eventText);
});

// Function to save event in localStorage
function saveEvent(hour, eventText) {
    // If statement to check if localStorage is supported
    if (typeof (Storage) !== "undefined") {
        // Retrieve existing events or initialize an empty array
        var events = JSON.parse(localStorage.getItem("events")) || [];

        // Updating or adding the new event
        var existingEvent = events.find(function (event) {
            return event.hour === hour;
        });

        if (existingEvent) {
            existingEvent.text = eventText;
        } else {
            events.push({
                hour: hour,
                text: eventText
            });
        }

        // Save the updated events array in localStorage
        localStorage.setItem("events", JSON.stringify(events));
    } else {
        console.error("LocalStorage is not supported in this browser");
    }
}

// Function to load events from localStorage
function loadEvents() {
    var events = JSON.parse(localStorage.getItem("events")) || [];

    // Looping through events and setting the text in corresponding textarea
    events.forEach(function (event) {
        $("[data-hour='" + event.hour + "']").siblings(".event-container").children(".event-input").val(event.text);
    });

    // Update the styling based on the current time
    updateStyling();
}

// Function to update styling based on the current time
function updateStyling() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
        var blockHourText = $(this).find(".hour p").text().trim();

        // Converting the 12-hour format to 24-hour format
        var blockHour = parseInt(blockHourText);

        // Adjusting for PM hours
        if (blockHourText.includes("PM") && blockHour !== 12) {
            blockHour += 12;
        }

        if (blockHour < currentHour) {
            $(this).addClass("past").removeClass("present future");
        } else if (blockHour === currentHour) {
            $(this).addClass("present").removeClass("past future");
        } else {
            $(this).addClass("future").removeClass("past present");
        }
    });
}

});
