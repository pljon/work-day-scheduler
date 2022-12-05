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
  // <to do if false> ? <to do if true>
  // 
  ? "present"
  : time.hour < today
  ? "past"
  : "future";
}


// For each hour in todayHours array, create grid with id in text format (ln. 10)
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
      // in line 44 text area element
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



// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.