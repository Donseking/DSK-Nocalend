var month_name = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

function writeday(day) {
    localStorage.setItem("day", day)
}

generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.days')
    let calendar_header_year = document.querySelector('.year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    // if (!month) month = currDate.getMonth()
    // if (!year) year = currDate.getFullYear()

    let curr_month = `${month_name[month]}`
    month.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    let first_day = new Date(year, month, 1)

    for (let i = 1; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        let co = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34]
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.style.textShadow = "rgba(0, 255, 255, 0.95) 0px 0px 10px"
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
            <span></span>
            <span></span>
            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
                day.style.boxShadow = "0px 0px 10px #ebc087"
            }
            for (let j = 0; j < 10; j ++) {
                if (i === (co[j] + 1)) {
                    day.classList.add('calendar-day-hover-color')
                    day.style.color = "#a99fee"
                    day.style.textShadow = "0px 0px 5px rgba(169, 159, 238, 0.85)"
                }
            }
            day.addEventListener("click", () => {
                let date = String(year) + String(month + 1) + String(i - first_day.getDay() + 1)
                writeday(date)
                location.replace("./day.html")
            })
        }
        calendar_days.appendChild(day)
    }
}

let month_list = document.querySelector('.list')
let mm = document.querySelector('.month')

month_name.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
        mm.innerHTML = '<div class = "month center">' + month_name[index] + '</div>'
    }
    month_list.appendChild(month)
})

let mon = document.querySelector("#titlemonth")

mon.onclick = () => {
    month_list.classList.add('show')
}
mon.onmouseover = () => {
    mon.style.color = "skyblue"
}
mon.onmouseout = () => {
    mon.style.color = "#00ffff"
}



let currDate = new Date()

let curr_month = { value: currDate.getMonth()}
let curr_year = { value: currDate.getFullYear() }

generateCalendar(curr_month.value, curr_year.value)

let L = document.querySelector(".left")
let R = document.querySelector(".right")

L.onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}
L.onmouseover = () => {
    L.style.border = "solid #00ffff"
    L.style.borderWidth = "0px 5px 5px 0px"
}
L.onmouseout = () => {
    L.style.border = "solid skyblue"
    L.style.borderWidth = "0px 5px 5px 0px"
}


R.onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}
R.onmouseover = () => {
    R.style.border = "solid #00ffff"
    R.style.borderWidth = "0px 5px 5px 0px"
}
R.onmouseout = () => {
    R.style.border = "solid skyblue"
    R.style.borderWidth = "0px 5px 5px 0px"
}