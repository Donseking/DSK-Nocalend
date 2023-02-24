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

function download(filename, textInput) {
    let element = document.createElement("a")
    element.setAttribute("href", "data:text/json;charset=utf-8, " + encodeURIComponent(textInput))
    element.setAttribute("download", filename)
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}


async function add_sticky_in_json(title, content) {
    let day = String(localStorage.getItem("day"))
    results =  await eel.add_data_to_json(day, title, content)()
}

function handata(datas) {
    let data = datas["allday"]
    let note = data[String(localStorage.getItem("day"))]
    for( let i = 0; i < note.stickys; i ++){
        let day = document.createElement("div")
        day.classList.add("sticky")
        day.innerHTML = note["sticky-list"][i]["sticky-title"]
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