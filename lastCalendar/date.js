let weekArr = ['sun', 'won', 'tue', 'wen', 'thu', 'fri', 'sat'];
let weekKor = ['일', '월', '화', '수', '목', '금', '토'];
let nthWeek = ['first', 'second', 'third', 'forth', 'fifth'];

let selectYear = document.getElementById('year');
let selectMonth = document.getElementById('month');

let prevBtn = document.querySelector('.prev');
let nextBtn = document.querySelector('.next');

/**
 * * select 박스에서 연도가 바뀌면 달력을 바뀐 날짜에 맞게 출력합니다.
 * @param {DOMElement} e - 이벤트 리스너를 적용한 year의 select 태그
 */
selectYear.addEventListener('change',(e) =>{
	let year = e.target.value;
	let month = selectMonth.value;
	clearCalendar(parseInt(year), parseInt(month) -1);
});

/**
 * * select 박스에서 월이 바뀌면 달력을 바뀐 날짜에 맞게 출력합니다.
 * @param {DOMElement} e - 이벤트 리스너를 적용한 monrh의 select 태그
 */
selectMonth.addEventListener('change',(e) =>{
	let year = selectYear.value;
	let month = e.target.value;
	clearCalendar(parseInt(year), parseInt(month) -1);
});

/**
 * * 버튼을 누르면 이전달을 출력하는 이벤트 리스너
 */
prevBtn.addEventListener('click', () => {
	let year = selectYear.value;
	let month = selectMonth.value;
	if (month == 1){
		let year = selectYear.value--;
		selectMonth.value = 12;
		selectYear.setAttribute('selected', true);
		selectMonth.setAttribute('selected', true);
		clearCalendar(parseInt(year), parseInt(month) - 2);
	}else{
		let month = selectMonth.value--;
		selectMonth.setAttribute('selected', true);
		clearCalendar(parseInt(year), parseInt(month) - 2);
	}
})

/**
 * * 버튼을 누르면 다음달을 출력하는 이벤트 리스너
 */
nextBtn.addEventListener('click', () => {
	let year = selectYear.value;
	let month = selectMonth.value;
	if (month == 12){
		let year = selectYear.value++;
		selectMonth.value = 1;
		month = selectMonth.value;
		selectYear.setAttribute('selected', true);
		selectMonth.setAttribute('selected', true);
		clearCalendar(parseInt(year), parseInt(month)-1);
	}else{
		let month = selectMonth.value++;
		selectMonth.setAttribute('selected', true);
		clearCalendar(parseInt(year), parseInt(month));
	}
})


/**
 * * select year combobox 만들기
 * @param {str} year - year 에 대한 option tag만들기
*/

function makeComboBoxYearOption(year){
	let optionYear = document.createElement('option');
	optionYear.setAttribute('value', year.toString());
	optionYear.appendChild(document.createTextNode(year))
	return optionYear;
}
/**
 * * select month combobox 만들기
 * @param {str} month - month 에 대한 option tag만들기
*/
function makeComboBoxMonthOption(month){
	let optionMonth = document.createElement('option');
	optionMonth.setAttribute('value', month.toString());
	optionMonth.appendChild(document.createTextNode(month))
	return optionMonth;
}

/**
 * * 200년어치 만큼 option tag를 만든다.
 */
for (let year = 1900; year <= 2199; year++){
	let optionYear = makeComboBoxYearOption(year);
	selectYear.appendChild(optionYear);
}
/**
 * * 12달의 option tag를 만든다.
 */
for (let month = 1; month <= 12; month++){
	let optionMonth = makeComboBoxMonthOption(month);
	selectMonth.appendChild(optionMonth);
}

/**
 * * 달력의 요일 div를 만든다. 미리 선언해둔 weekArr을 사용한다.
 * @param {number} week - weekArr의 인덱스 접근을 위한 인자
 * 
 * @return {domElement} div.day.weekArr[week]
 */
function makeDayDiv(week){
	let calendarDay = document.createElement('div');
	calendarDay.className = `day ${weekArr[week]}`;
	return calendarDay
}

/**
 * * 일요일부터 토요일까지 달력에 표시한다.
 * @param {none} - 단순반복
 */
// 일~토 만들기
function weekDay() {
	for (let week = 0; week < 7; week++) {
		let calendarDay = makeDayDiv(week);
		let day = document.createTextNode(weekKor[week]);
		document.querySelector('.weekend').appendChild(calendarDay).appendChild(day);
	}
}

/**
 * * 달력에 일주일에 해당하는 한줄을 만든다.
 * * 기본적으로 5주를 하되 가끔 존재하는 6주를 위해 반복문의 인자를 받는다.
 * @param {int} nthWeekOfMonth - 5주를 기본으로 하되 가끔 6주를 출력하기 위해 반복 횟수를 받는다.
 */
function makeWeekDiv(nthWeekOfMonth){
	for (let nth = 0; nth < nthWeekOfMonth; nth++) {
		let weekDiv = document.createElement('div');
		weekDiv.className = `week ${nthWeek[nth]}`;
		document.querySelector('main').appendChild(weekDiv);
	}
}


// dayDiv 만들기
/**
 * * 각 1주 7일에 해당하는 격자를 만든다.
 *  @param {none} - 7번 반복
 */
function dayDiv(){
	let mainNodeLength = document.querySelector('main').childNodes.length;
	for (let child = 0; child < mainNodeLength; child ++) {
		for (let week = 1; week <= 7; week++) {
			let calendarDay = makeDayDiv(week-1);
			document.querySelector(`main`).childNodes[child].appendChild(calendarDay);
		} 
	}
}

/**
 * * 각 주마다 들어가야 하는 날짜를 입력한다.
 * @param {number} getYear - 사용자가 선택한 연도
 * @param {number} getMonth - 사용자가 선택한 월
 * @param {number} nthWeekOfMonth - 해당 달에 출력해야하는 주의 갯수
 */
function fillCalendar(getYear, getMonth, nthWeekOfMonth){
	for (let idx = 1; idx <= nthWeekOfMonth; idx++) {
			let dayOfStart = new Date(getYear, getMonth, 1).getDay();
			let prevDays = -dayOfStart + 1;
			let startDayOfWeek = prevDays + 6 + (7 * (idx - 2));
		if (idx == 1){
			for (let day = 1; day <= 7; day++) {
				if (prevDays <= 0){
					if (getMonth <= 0){
						let getYearOver= getYear - 1;
						let getMonthOver = 12 + getMonth;
						let dayNum = document.createTextNode(`${getMonthOver}/${new Date(getYearOver, getMonthOver, prevDays).getDate()}`);
						document.querySelector(`div.week.${nthWeek[idx-1]} > div.day.${weekArr[day-1]}`).appendChild(dayNum);
						document.querySelector(`div.week.${nthWeek[idx-1]} > div.day.${weekArr[day-1]}`).style.color = 'gray';
					}else{
						let dayNum = document.createTextNode(`${getMonth}/${new Date(getYear, getMonth, prevDays).getDate()}`);
						document.querySelector(`div.week.${nthWeek[idx-1]} > div.day.${weekArr[day-1]}`).appendChild(dayNum);
						document.querySelector(`div.week.${nthWeek[idx-1]} > div.day.${weekArr[day-1]}`).style.color = 'gray';
					}
				}
				else{
					let dayNum = document.createTextNode(new Date(getYear, getMonth+1, prevDays).getDate());
					document.querySelector(`div.week.${nthWeek[idx-1]} > div.day.${weekArr[day-1]}`).appendChild(dayNum);
					if ((prevDays == new Date().getDate()) && (getMonth == new Date().getMonth())){
						document.querySelector(`div.week.${nthWeek[idx-1]} > div.day.${weekArr[day-1]}`).style.backgroundColor = 'LightSkyBlue';
					}
				}
				prevDays++;
			}
		}
		else if (idx == nthWeekOfMonth){
			let dayOfLast = new Date(getYear, getMonth + 1, 0).getDay();
			let nextDays = 6 - dayOfLast ;
			for (let day = 7; day >= 1; day--) {
				if (nextDays > 0){
					if (getMonth > 12){
						let getYearOver= getYear + 1;
						let getMonthOver = getMonth - 12;
						let dayNum = document.createTextNode(`${getMonthOver+2}/${new Date(getYearOver, getMonthOver+1, nextDays).getDate()}`);
						document.querySelector(`div.week.${nthWeek[idx-1]} > div.day.${weekArr[day-1]}`).appendChild(dayNum);
						document.querySelector(`div.week.${nthWeek[idx-1]} > div.day.${weekArr[day-1]}`).style.color = 'gray';
					}else{
						let dayNum = document.createTextNode(`${getMonth + 2}/${new Date(getYear, getMonth+1, nextDays).getDate()}`);
						document.querySelector(`div.week.${nthWeek[idx-1]} > div.day.${weekArr[day-1]}`).appendChild(dayNum);
						document.querySelector(`div.week.${nthWeek[idx-1]} > div.day.${weekArr[day-1]}`).style.color = 'gray';
					}
				}
				else{
					let dayNum = document.createTextNode(new Date(getYear, getMonth+1, nextDays).getDate());
					document.querySelector(`div.week.${nthWeek[idx-1]} > div.day.${weekArr[day-1]}`).appendChild(dayNum);
					if ((nextDays == new Date().getDate()) && (getMonth == new Date().getMonth())){
						document.querySelector(`div.week.${nthWeek[idx-1]} > div.day.${weekArr[day-1]}`).style.backgroundColor = 'LightSkyBlue';
					}
				}
				nextDays--;
			}
		}
		else {
			for (let day = 1; day <= 7; day++) {
				let dayNum = document.createTextNode(++startDayOfWeek);
				document.querySelector(`div.week.${nthWeek[idx-1]} > div.day.${weekArr[day-1]}`).appendChild(dayNum);
				if ((startDayOfWeek == new Date().getDate()) && (getMonth == new Date().getMonth())){
					document.querySelector(`div.week.${nthWeek[idx-1]} > div.day.${weekArr[day-1]}`).style.backgroundColor = 'LightSkyBlue';
				}
			}
		}
	}
}


/**
 * *달력을 만드는 행위를 하나의 함수로 만든다.
 * @param {number} selectedYear - 사용자가 선택한 연도
 * @param {number} selectedMonth - 사용자가 선택한 달
 */
function loadCalendar(selectedYear, selectedMonth) {
	let first = new Date(selectedYear, selectedMonth, 1);
	let firstWeekDay= first.getDay();
	let last = new Date(selectedYear, selectedMonth+1, 0);
	let lastWeekDay= last.getDay();
	let findWeek = Math.abs(firstWeekDay - lastWeekDay);
	if ( findWeek < 5){
		let nthWeekOfMonth = 5;
		weekDay();
		makeWeekDiv(nthWeekOfMonth);
		dayDiv();
		fillCalendar(selectedYear, selectedMonth, nthWeekOfMonth);
	}else{
		let nthWeekOfMonth = 6;
		weekDay();
		makeWeekDiv(nthWeekOfMonth);
		dayDiv();
		fillCalendar(selectedYear, selectedMonth, nthWeekOfMonth);
	}
}

/**
 * * 달이 변경될 때 마다 달력의 모든 노드를 지운다.
 * @param {number} curYear - 현재 선택된 연도
 * @param {number} curMonth - 현재 선택된 달
 */
async function clearCalendar(curYear, curMonth) {
	let mainNode = document.querySelector('main');
	let weekendHeader = document.querySelector('header.weekend');
	while (weekendHeader.hasChildNodes()) {
		await weekendHeader.removeChild(weekendHeader.firstChild);
	}
	while (mainNode.hasChildNodes()) {
		await mainNode.removeChild(mainNode.firstChild);
	}
	setTimeout(() =>{loadCalendar(curYear, curMonth)}, 0)
}

/**
 * * 페이지가 새로 로드될 때마다 오늘 날짜의 달력을 보여준다.
 */
window.addEventListener('load',async () => {
	let today = new Date();
	let defaultYear = document.querySelector(`option[value="${today.getFullYear()}"]`);
	let defaultMonth = document.querySelector(`#month > option[value="${today.getMonth() + 1}"]`)
	defaultYear.setAttribute('selected', true);
	defaultMonth.setAttribute('selected', true);
	let curYear = today.getFullYear();
	let curMonth = today.getMonth();
	await loadCalendar(curYear, curMonth);
});