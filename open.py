import os
import tkinter as tk
from turtle import bgcolor

app = tk.Tk()
app.attributes('-topmost', True)
app.attributes('-alpha', 0.8)
app.geometry('200x50')
app.resizable(width = 0, height = 0)

def open():
    os.system("python app.py")

btn = tk.Button(app, text = "open", command = open)
btn.config(width = 200, height = 50, bg = "#272727", font = "微軟正黑體", fg = "skyblue")
btn.pack()

app.mainloop()