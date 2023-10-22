const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const d = new Date();
let day = weekday[d.getDay()];
let month = months[d.getMonth()];

header = document.getElementById("header");
header.innerText = day

// SL
fetch("https://api.sl.se/api2/realtimedeparturesV4.json?key=f80580535d7346719e4ac909f1bf6595&siteid=7000&timewindow=10")
  .then(res => res.json())
  .then(res => res.ResponseData.Buses.forEach((data) => {
    SLbus(data);
}))

const SLbus = (data) => {
    var busesLineNumber = data.LineNumber;
    var busesDestination = data.Destination;
    var busesDisplayTime = data.DisplayTime;

    var slCont = document.getElementById("sl");
    var slItem = document.createElement("div");
    var slBusItem = document.createElement("div");
    var slTimeItem = document.createElement("div");
    var slIcon = document.createElement("img");
    var slLineNumber = document.createElement("p");
    var slDestination = document.createElement("p");
    var slTime = document.createElement("p");

    slIcon.src = '../img/buss-icon.png';
    slIcon.className = 'buss-icon';
    slItem.className = 'sl-item';
    slTimeItem.className = 'sl-timeitem';
    slBusItem.className = 'sl-busitem';

    slLineNumber.innerText = busesLineNumber;
    slDestination.innerText = busesDestination;
    slTime.innerText = busesDisplayTime;

    slBusItem.appendChild(slIcon);
    slBusItem.appendChild(slLineNumber); 
    slBusItem.appendChild(slDestination);
    slTimeItem.appendChild(slTime);  
    slCont.appendChild(slItem);
    slItem.appendChild(slBusItem);
    slItem.appendChild(slTimeItem);
}

fetch("https://api.sl.se/api2/realtimedeparturesV4.json?key=f80580535d7346719e4ac909f1bf6595&siteid=7006&timewindow=20")
  .then(res => res.json())
  .then(res => res.ResponseData.Trains.forEach((data) => {
    SLtrain(data);
}))

const SLtrain = (data) => {
    var trainLineNumber = data.LineNumber;
    var trainDestination = data.Destination;
    var trainDisplayTime = data.DisplayTime;

    var slCont = document.getElementById("sl");
    var slItem = document.createElement("div");
    var slTrainItem = document.createElement("div");
    var slTimeItem = document.createElement("div");
    var slIcon = document.createElement("img");
    var slLineNumber = document.createElement("p");
    var slDestination = document.createElement("p");
    var slTime = document.createElement("p");

    slIcon.src = '../img/train-icon.png';
    slIcon.className = 'train-icon';
    slItem.className = 'sl-item';
    slTimeItem.className = 'sl-timeitem';
    slTrainItem.className = 'sl-trainitem';

    slLineNumber.innerText = trainLineNumber;
    slDestination.innerText = trainDestination;
    slTime.innerText = trainDisplayTime;
    
    slTrainItem.appendChild(slIcon);
    slTrainItem.appendChild(slLineNumber); 
    slTrainItem.appendChild(slDestination);
    slTimeItem.appendChild(slTime);
    slCont.appendChild(slItem);
    slItem.appendChild(slTrainItem);
    slItem.appendChild(slTimeItem);
    
}


// OpenWeather
fetch('https://api.openweathermap.org/data/2.5/weather?q=stockholm&units=metric&appid=7289814eccc9191f98b60b116d931cfd')
    .then(res => res.json())
    .then(json => OpenWeather(json)
);

const OpenWeather = (json) => {
    var owCont = document.getElementById("ow");
    
    var owNow = document.createElement("div");
    var owIcon = document.createElement("img");
    var owDesc = document.createElement("p");
    var owTemp = document.createElement("p");

    owIcon.src = '../img/icons/' + json.weather[0].icon + '.png';
    owNow.className = 'ow-now';

    owDesc.innerText = json.weather[0].description;
    owTemp.innerText = Math.trunc(json.main.temp) + "°";

    owNow.appendChild(owIcon);
    owNow.appendChild(owDesc);
    owNow.appendChild(owTemp);
    owCont.appendChild(owNow);
}

fetch('https://api.openweathermap.org/data/2.5/forecast?q=stockholm&units=metric&appid=7289814eccc9191f98b60b116d931cfd')
    .then(res => res.json())
    .then(json => json.list.forEach((data) => {
        OpenWeatherDaily(data);
    }))

    const OpenWeatherDaily = (data) => {
        var time = data.dt_txt.slice(-8);
        const d = new Date(data.dt_txt);
        let day = weekday[d.getDay()];
        if (time == "15:00:00") {
            var owCont = document.getElementById("ow");

            var owDailyItem = document.createElement("div");
            var owDailyTemp = document.createElement("p");
            var owDay = document.createElement("p");
            var owDailyIcon = document.createElement("img");

            owDailyItem.className = 'ow-daily-item';
            owDailyIcon.src = '../img/icons/' + data.weather[0].icon + '.png';

            owDailyTemp.innerText = Math.trunc(data.main.temp) + "°";
            owDay.innerText = day;

            owDailyItem.appendChild(owDailyIcon);
            owDailyItem.appendChild(owDay);
            owDailyItem.appendChild(owDailyTemp);
            owCont.appendChild(owDailyItem);
        }
    }

// NY Books
fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=Tg2pWhabVNDcALUpf6dldguZU9FNgTdm')
    .then(res => res.json())
    .then(json => json.results.books.slice(0, 5).forEach((book) => {
      NYBestseller(book);
    }))

const NYBestseller = (book) => {
    var bookCont = document.getElementById("book");

    var bookItem = document.createElement("div");
    var bookTitle = document.createElement("p");
    var bookAuthor = document.createElement("p");

    bookItem.className = 'book-item';

    bookTitle.innerText = book.rank + " " + book.title;
    bookAuthor.innerText = "By " + book.author;

    bookItem.appendChild(bookTitle);
    bookItem.appendChild(bookAuthor);
    bookCont.appendChild(bookItem);
}