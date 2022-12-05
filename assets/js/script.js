// 'dddd MMM DD, YYYY' = <day word> <month word> <day number> <year number>
var today = dayjs();
$('#currentDay').text(today.format('[Today is] dddd MMM DD, YYYY'));

// h:00 A = <hour number>:00 <AM or PM>
var currentTime = {text: today.format("h:00 A"), hour: today.hour()};

var container = $(".container-lg");
var store = window.localStorage;

// Create new array of 24 for each hour of day
var todayHours = Array.from(new Array(24)).map((v, i) => {
  var text = today.hour(i).format("h:00 A");
  var hour = today.hour(i);
  return {text, hour};
})

// Determine color to current time
// return with argument, if the hour is equal to currentTime, assign present
// else if time is less than today (see global variable)
// if true, assign past
// else if false (time is greater), assign future

function color(time) {
  // return <parameter>
  return time.text === currentTime.text 
  // ternary operators
  // parameter is left of ? , which is time.text === currentTime.text, true in this case
  ? "present"
  // : similar to else if followed by new parameter
  : time.hour < today
  // since true to time.hour < hour, inputs value
  ? "past"
  // since false, adds this value
  : "future";
}


// For each hour in todayHours array, create grid with id in text format (ln. 12)
// forEach creates new divs
$(function () {
  todayHours.forEach((hr) => {
    var grid = $(
      `<form id="${hr.text}" class="row time-block"> </form>`
    );
    // Each index.text will displays as the time for each timeblock
    var time = $(
      `<div class="col-2 col-md-1 hour text-center py-3">${hr.text}</div>`
    );
    // Name set to hr.text so inputted text can be referenced when 
    // saving /  getting to / from localstorage
    // ${color(hr)} adds present, past, future according to function color(time) see ln. 25
    var textArea = $(
      `<textarea name="${hr.text}" class="col-8 col-md-10 description ${color(hr)}" rows="3">${store.getItem(hr.text) || ""}</textarea>`
    );

    var saveButton = $(
      `<button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
      </button>`
    );
    // Click event listener to take value in textarea element to be saved in
    // localstorage
    grid.submit((e) => {
      e.preventDefault();
      // value represents the text value in text area element
      // saves to localstorage as hr.text which can be pulled from localstorage
      var value = $(`textarea[name="${hr.text}"]`).val();
      store.setItem(hr.text, value);
    })

    // Appends grid as child of container, appends rest as child under grid
    container.append(grid);
    grid.append(time);
    grid.append(textArea);
    grid.append(saveButton);
    
  });
});