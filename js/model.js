/* Events storage*/;
var events = [];

/* The function for saving data from the form */
function save() {
    events.push({date:document.forms[0].taskDate.value, title: document.forms[0].taskTitle.value});
    localStorage.setItem("events", JSON.stringify(events));
    location.reload();
}
