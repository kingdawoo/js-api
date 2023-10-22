const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const d = new Date();
let day = weekday[d.getDay()];

header = document.getElementById("header");
header.innerText = day;

// Google Calendar
fetch('https://www.googleapis.com/calendar/v3/calendars/c_d9aaaa6aa5b776b23b57ec82ab49a0b39b34177b8390aa055f926d10033e3648@group.calendar.google.com/events?key=AIzaSyBI76Yu_T51eFAC0HirExQGk8CnOZaMUqA')
    .then(res => res.json())
    .then(json => {
        json.items.forEach(data => {
            arrayInput(data);
        });

        createLessonCard();
    });

const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const date = now.getDate().toString().padStart(2, '0');
const today = `${year}-${month}-${date}`;

let lessonArray = [];
const arrayInput = (data) => {
    if (data.start && data.start.dateTime && data.end && data.end.dateTime) {
        const startTime = data.start.dateTime.split('T')[1].substring(0, 5);
        const endTime = data.end.dateTime.split('T')[1].substring(0, 5);
        const summary = data.summary;

        const eventString = `${startTime}-${endTime}-${summary}`;
        if (!lessonArray.includes(eventString) && today === data.start.dateTime.split('T')[0]) {
            lessonArray.push(eventString);
        }
    }
    lessonArray.sort();
}

const createLessonCard = () => {
    var lessonCont = document.getElementById('lessonCont');
    lessonCont.innerHTML = '';

    lessonArray.forEach((item) => {
        const [startTime, endTime, summary] = item.split('-');
        var lessonItem = document.createElement('div');
        var lessonName = document.createElement('p');
        var lessonTime = document.createElement('p');

        lessonItem.className = 'lesson-item';
        lessonName.className = 'lesson-name';
        lessonTime.className = 'lesson-time';

        lessonName.textContent = summary;
        lessonTime.textContent = `${startTime} - ${endTime}`;

        lessonItem.appendChild(lessonTime);
        lessonItem.appendChild(lessonName);
        lessonCont.appendChild(lessonItem);
    });
}
