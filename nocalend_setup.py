import os, shutil

os.system("cd ..")

os.system("py -m pip install pyinstaller==5.6.2")
os.system("py -m eel app.py index -i nocalend_icon.ico --onefile --noconsole")
dist = os.getcwd() + "\\dist\\app.exe"
shutil.move(dist, os.getcwd())

os.system("pause")