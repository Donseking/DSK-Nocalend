import time, itertools
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

@eel.expose
def stop(times) :
    time.sleep(times)
    return 0

@eel.expose
def SearchAlgorithms(keyword):
    re = []
    res = []
    with open(jsonpath, "r", encoding = "UTF8") as f :
        data = json.load(f)
    DataValues = list(data["allday"].values())
    DataKeys = list(data["allday"].keys())
    for j, i in itertools.zip_longest(DataKeys, DataValues) :
        stickylist = i["sticky-list"]
        if len(stickylist) != 0 :
            for i in range(len(stickylist)) :
                re.append(stickylist[i]["title"])
                if keyword == stickylist[i]["title"] :
                    res.append(j)
                    res.append(stickylist[i]["content"])
    if keyword == "" :
        res.append(405) # 405 代表值為空
        res.append("file : tst.py\nSearch value is empty.")
    elif keyword not in re :
        res.append(404)
        res.append("file : tst.py\nNo relevant information found.")
    return res

eel.init("index")
eel.start('index.html', size = (700, 700), port = 42351)