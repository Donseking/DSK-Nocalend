import eel, json

jsonpath = "./index/data/day-note.json"

@eel.expose
def add_data_to_json(day, title, content) :
    with open(jsonpath, "r", encoding = "UTF8") as file :
        data = json.load(file)
    try :
        currdayNote = data["allday"][day]
        stickylist = currdayNote["sticky-list"]
        stickylist.append({"content" : content, "title" : title})
        currdayNote["sticky-num"] = len(stickylist)
        with open(jsonpath, "w") as f :
            json.dump(data, f, indent = 4, separators = (",", " : "), sort_keys = True)
    except KeyError :
        data["allday"][day] = {
            "sticky-num" : 1,
            "sticky-list" : [
                {
                    "title" : title,
                    "content" : content
                }
            ]
        }
        with open(jsonpath, "w") as f :
            json.dump(data, f, indent = 4, sort_keys = True, separators = (",", " : "))

@eel.expose
def DeJData(day, title, num) :
    with open(jsonpath, "r", encoding = "UTF8") as f :
        data = json.load(f)
    currdaylist = data["allday"][day]["sticky-list"]
    if currdaylist[num]["title"] == title :
        del currdaylist[int(num)]
        data["allday"][day]["sticky-num"] -= 1
    with open(jsonpath, "w") as f :
        json.dump(data, f, indent = 4, sort_keys = True, separators = (",", " : "))

@eel.expose
def GetNoteNum(day) :
    with open(jsonpath, "r") as f:
        data = json.load(f)
    try :
        currdayNotenum = data["allday"][day]["sticky-num"]
        return currdayNotenum
    except KeyError :
        return 0


eel.init("index")
eel.start('index.html', size = (700, 700))