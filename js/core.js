
/* Container of the Display */
var el = null;
/* Routes storage*/
var routes = {};

/* The function to determine a route within our application's request */
function router() {
    el = el || document.getElementById("view");
    var url = location.hash.slice(1) || '/';
    var route = routes[url]; 
    if(el && route.controller) {
        el.innerHTML = render(route.templateId, route.controller);
    }
}

/* The function for adding web application routes */
function addRoute(path, templateId, controller) {
    routes[path] = { templateId:templateId, controller:controller };
}

/* The function to display relevant information */
function render(template, controller) {
   data = document.getElementById(template).innerHTML;
   controller = new controller();
   for (var key in controller) {
       if(data.indexOf('<%= ' + key + ' %>') >= 0) {
           data = data.replace(new RegExp('<%= ' + key + ' %>'), controller[key]);
       }
   }
    return data;
}

/* Adding event listener for changing the hash and loading the page */
window.addEventListener("hashchange", router);
window.addEventListener("load", router);

/* Adding routes */
addRoute('/', 'home', function () {
    if (localStorage.getItem("events")) {
        var dataEvents = JSON.parse(localStorage.getItem("events"));
        this.date = dataEvents[0].date;
        this.title = dataEvents[0].title; 
    } else {
        console.error("Erorr in data");
    }
});
addRoute('/aboutpage', 'aboutpage', function () {
    this.title = ' Про сервіс';
    this.myparagraph = 'Даний сервіс дозволяє зберігати та переглядати списки запланованих та минулих подій';
});
addRoute('/contacts', 'contacts', function () {
    this.title = 'Мої контакти';
    this.myparagraph = 'Для зв\'язку зі мною пишіть mailme@mymail.com';
});

/* testing routes */
router();

