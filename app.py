import eel, json


@eel.expose
def add_data_to_json(day, title, content) :
    with open("index/data/day-note.json", "r", encoding = "UTF8") as file :
        data = json.load(file)
    try :
        currdayNote = data["allday"][day]
        print(currdayNote)
        return currdayNote
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
        with open("index/data/day-note.json", "w") as f :
            json.dump(data, f, indent = 4, sort_keys = True, separators = (",", " : "))


eel.init("index")
eel.start('index.html', size = (700, 700))