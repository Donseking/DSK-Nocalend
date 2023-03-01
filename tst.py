import json, itertools

jsonpath = "./index/data/day-note.json"

# @eel.expose
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


print(SearchAlgorithms(input(" > ")))