let bt = document.querySelector("#back")

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
    }else {
        addwin.classList.remove("show")
    }
})

let main = document.querySelector(".main")

main.onload = Geturl("data/day-note.json")


async function add_sticky_in_json(title, content) {
    let day = String(localStorage.getItem("day"))
    let addwin_title_input = document.querySelector("#addwin-title-input")
    let addwin_main_input = document.querySelector("#addwin-main-input")
    await eel.add_data_to_json(day, title, content)()
    addwin_title_input.value = ""
    addwin_main_input.value = ""
    location.reload()
}

function handata(datas) {
    let data = datas["allday"]
    let note = data[String(localStorage.getItem("day"))]
    for( let i = 0; i < note["sticky-num"]; i ++){
        let day = document.createElement("div")
        day.classList.add("sticky")
        day.innerHTML = note["sticky-list"][i]["title"]
        day.addEventListener("click", NoteWinShow)
        main.appendChild(day)
    }
}

function handlejson(url){
    let req = new XMLHttpRequest()
    req.open("GET", url)
    req.responseType = "json"
    req.send()
    req.onload = () => {
        handata(req.response)
    }
}


function Geturl(path){
    var url = fetch(path, (results) => { return results })
    .then((results) => {
        handlejson(results["url"])
    })
    url.catch((err) => {
        console.log(err)
    })
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
    let title = document.querySelector("#addwin-title-input").value
    let content = document.querySelector("#addwin-main-input").value
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

function NoteWinShow() {
    let notewin = document.querySelector(".notewin")
    notewin.classList.add("notewinshow")
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

// de.addEventListener("click", () => {
    
// })