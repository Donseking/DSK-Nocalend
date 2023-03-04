import os

os.system("cd ..")


os.system("py -m pip install pyinstaller")
os.system("py -m eel app.py index -i nocalend_icon.ico --onefile --noconsole")
    

os.system("pause")