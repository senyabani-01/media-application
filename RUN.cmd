@echo off
REM ===== Our Warming World: how to run (Windows) =====
REM LIBRARIES NEEDED: none for the website (plain HTML/CSS/JavaScript).
REM Only Python 3 is needed, to start a small local web server.
REM   Download Python: https://www.python.org/downloads/  (tick "Add Python to PATH")
REM   Check it works:  python --version
REM The data is already prepared in the data folder (data\data.json).
REM OPTIONAL: to rebuild data.json from the CSV, run these two commands:
REM   pip install pandas
REM   python prepare_data.py
REM To stop the server, press Ctrl+C in this window.
echo Starting at http://localhost:8000 ...
start "" http://localhost:8000
python -m http.server 8000 || py -m http.server 8000
