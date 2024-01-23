
$(document).ready(function () {
    // Display current day at the top
   displayCurrentDay();
   function displayCurrentDay() {
    $("#currentDay").text(dayjs().format("D MMMM, YYYY"));
  }

  // Load events on page load
  loadEvents();
});



