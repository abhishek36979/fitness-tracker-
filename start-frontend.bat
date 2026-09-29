@echo off
cd /d "%~dp0frontend"
echo Serving frontend at http://127.0.0.1:5500/login.html
python -m http.server 5500
