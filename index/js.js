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

async function getnotenum(currday){
    let div = await eel.GetNoteNum(currday)()
    return div
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
    let mon = document.querySelector("#titlemonth")
    mon.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    let first_day = new Date(year, month, 1)

    for (let i = 1; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        let dday = document.createElement('div')
        let ddday = document.createElement('div')
        let daynum = document.createElement("div")
        let co = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34]
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.style.textShadow = "rgba(0, 255, 255, 0.95) 0px 0px 10px"
            daynum.innerHTML = i - first_day.getDay() + 1
            day.innerHTML = "<span></span>"
            daynum.classList.add("daynum")
            dday.classList.add("dday")
            ddday.classList.add("ddday")
            let currd = String(year) + String(month + 1) + String(i - first_day.getDay() + 1)
            let note_num = getnotenum(currd)
            note_num.then((re) => {
                let notenum = document.createElement("div")
                if (re != 0){
                    notenum.innerHTML = re
                }else {
                    notenum.innerHTML = ""
                }
                notenum.classList.add("notenum")
                dday.appendChild(notenum)
                dday.appendChild(ddday)
            }).catch((err) => {
                console.log("file : js.js [57:47]\n" + err)
            })
            day.appendChild(daynum)
            day.appendChild(dday)
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

let find_input = document.querySelector("#find_input")
let find = document.querySelector(".find")
find.addEventListener("mouseover", () => {
    find.classList.add("after")
    find_input.classList.add("two")
    sleep(3)
    .then((re) => {
        if (re === 0) {
            mout()
        }
    })
    .catch((err) => {
        console.log(err)
    })
})

find_input.addEventListener("keyup", function(event){
    event.preventDefault()
    if (event.keyCode === 13) {
        Algorithms(find_input.value)
        .then((re) => {
            alert(re[1])
        })
        .catch((err) => {
            console.log(err)
        })
    }
})

async function Algorithms(words) {
    let re = await eel.SearchAlgorithms(words)()
    return re
}

async function sleep(sec) {
    let re = await eel.stop(sec)()
    return re
}

function mout() {
    find.addEventListener("mouseout", () => {
        sleep(3)
        .then((re) => {
            if (re === 0) {
                find.classList.remove("after")
                find_input.classList.remove("two")
                find_input.value = ""
                find_input.blur()
            }
        })
        .catch((err) => {
            console.log("file : js.js [ 172 : 36 ] " + err)
        })
    })
}

document.querySelector(".search").onclick = () => {
    Algorithms(find_input.value)
        .then((re) => {
            alert(re[1])
        })
        .catch((err) => {
            console.log(err)
        })
        document.querySelector(".search").blur()
}