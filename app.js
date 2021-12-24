const currentYear = 2022;
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'Octomber',
	'November',
	'December'
];

let activeColor = '';

const calendar = document.getElementById('calendar');
const moods = document.querySelectorAll('.mood');

moods.forEach(mood => {
	mood.addEventListener('click', () => {
		// if is already selected, deselect it
		if (mood.classList.contains('selected')) {
			mood.classList.remove('selected');
			activeColor = defaultColor;
		} else {
			moods.forEach(mood => {
				mood.classList.remove('selected');
			});

			mood.classList.add('selected');
			activeColor = getComputedStyle(mood).getPropertyValue('color');
		}
	});
});

const getAllDays = year => {
	// First day of the year - 1st January
	const firstDay = new Date(`January 1 ${year}`);
	// Last day of the year - 31th December - used to stop adding days to the array
	const lastDay = new Date(`December 31 ${year}`);

	// Add first day
	const days = [firstDay];

	// Used to keep track of the day
	let lastDayInArray = firstDay;
	
	// Loop while there are new days to be added in the current year
	while (lastDayInArray.getTime() !== lastDay.getTime()) {
		days.push(addDays(lastDayInArray, 1));
		lastDayInArray = days[days.length - 1];
	}

	return days;
};

const dates = getAllDays(currentYear);

let monthsHTML = '';

// Loop over the months and create a div for each month
months.forEach((month, idx) => {
	monthsHTML += `<div class="months month_${idx}">
        <h3>${month}</h3>
        <div class="week_days_container">
            ${weekDays
				.map(day => `<div class="week_days">${day}</div>`)
				.join('')}
        </div>
        <div class="days_container"></div>
    </div>`;
});

calendar.innerHTML = monthsHTML;

// Loop over each day and
dates.forEach(date => {
	const month = date.getMonth();
	const monthEl = document.querySelector(`.month_${month} .days_container`);

	// create extra day slots if needed before day 1
	if (date.getDate() === 1 && date.getDay() !== 0) {
		for (let i = 0; i < date.getDay(); i++) {
			const emptySpot = createEmptySpot();

			monthEl.appendChild(emptySpot);
		}
	}

	const dateEl = createDateEl(date);
   
	monthEl.appendChild(dateEl);
});

// Add click event to all the .circles
const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
	circle.addEventListener('click', () => {
		circle.style.backgroundColor = activeColor;
	});
});


function createDateEl(date) {
	const day = date.getDate();
	const dateEl = document.createElement('div');
	dateEl.classList.add('days');
	dateEl.innerHTML = `<span class="circle">${day}</span>`;
    
	return dateEl;
}

function createEmptySpot() {
	const emptyEl = document.createElement('div');
	emptyEl.classList.add('days');

	return emptyEl;
}

function addDays(date, days) {
	let result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}
