let bt = document.querySelector("#back")
let DAY = String(localStorage.getItem("day"))

bt.addEventListener("click", () => {
    location.replace("./index.html")
})
bt.addEventListener("mouseover", () => {
    bt.style.backgroundColor = "skyblue"
    bt.style.color = "#272727"
    bt.style.border = "3px solid #00ffff"
})
bt.addEventListener("mouseout", () => {
    bt.style.backgroundColor = "#272727"
    bt.style.color = "aqua"
    bt.style.border = "3px solid skyblue"
})

let add = document.querySelector("#add")
add.addEventListener("mouseover", () => {
    add.style.backgroundColor = "skyblue"
    add.style.color = "#272727"
    add.style.border = "3px solid #00ffff"
})
add.addEventListener("mouseout", () => {
    add.style.backgroundColor = "#272727"
    add.style.color = "aqua"
    add.style.border = "3px solid skyblue"
})
let times = 0
add.addEventListener("click", () => {
    times ++
    let addwin = document.querySelector(".addwin")
    if (times%2 === 1) {
        addwin.classList.add("show")
        document.querySelector("#addwin-title-input").focus()
    }else {
        addwin.classList.remove("show")
    }
})

let main = document.querySelector(".main")
main.onload = Geturl()


async function add_sticky_in_json(title, content) {
    let addwin_title_input = document.querySelector("#addwin-title-input")
    let addwin_main_input = document.querySelector("#addwin-main-input")
    await eel.add_data_to_json(DAY, title, content)()
    addwin_title_input.value = ""
    addwin_main_input.value = ""
    location.reload()
}

let Nnum = 0
async function Geturl(){
    let re = await eel.getjsondata(localStorage.getItem("day"))
    let re1 = re[0]
    let re2 = re[1]
    for( let i = 0; i < re[2]; i ++){
        let day = document.createElement("div")
        day.classList.add("sticky")
        day.classList.add(i)
        day.innerHTML = re1[i]
        day.addEventListener("click", () => {
            NoteWinShow(re2[i])
            localStorage.setItem("Ntitle", re1[i])
            localStorage.setItem("Ncontent", re2[i])
            Nnum = i
        })
        main.appendChild(day)
    }
}

let enters = document.querySelector(".enters")

enters.addEventListener("mouseover", () => {
    enters.style.backgroundColor = "skyblue"
    enters.style.color = "#272727"
    enters.style.border = "3px solid #00ffff"
})
enters.addEventListener("mouseout", () => {
    enters.style.backgroundColor = "#272727"
    enters.style.color = "aqua"
    enters.style.border = "3px solid skyblue"
})

enters.addEventListener("click", () => {
    let time = new Date()
    let currtime = String(time.getHours()) + " - " + String(time.getMinutes()) + " - " + String(time.getSeconds())
    let title = document.querySelector("#addwin-title-input").value
    let content = document.querySelector("#addwin-main-input").value
    let create = document.querySelector(".createtime")
    create.innerHTML = "+++"
    add_sticky_in_json(title, content)
})

let x = document.querySelector("#x")
x.addEventListener("click", () => {
    let addwin = document.querySelector(".addwin")
    addwin.classList.remove("show")
    times ++
})


let x2 = document.querySelector("#x2")
x2.addEventListener("click", () => {
    let notewin = document.querySelector(".notewin")
    notewin.classList.remove("notewinshow")
})

function NoteWinShow(c) {
    let notewin = document.querySelector(".notewin")
    let con = document.querySelector("#NoteContent")
    notewin.classList.add("notewinshow")
    con.value = c
}

let de = document.querySelector(".delete")
de.addEventListener("mouseover", () => {
    de.style.backgroundColor = "skyblue"
    de.style.color = "#272727"
    de.style.border = "3px solid #00ffff"
})
de.addEventListener("mouseout", () => {
    de.style.backgroundColor = "#272727"
    de.style.color = "aqua"
    de.style.border = "3px solid skyblue"
})

de.addEventListener("click", dejson)

async function dejson(){
    await eel.DeJData(DAY, localStorage.getItem("Ntitle"), Nnum)()
    location.reload()
}

let con = document.querySelector(".console")
con.innerHTML = localStorage.getItem("day")