@echo off
REM Simple web server script for Windows
REM This script tries multiple methods to start a web server

echo ========================================
echo Starting Web Server
echo ========================================
echo.

REM Check if Python 3 is available
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using Python to start web server...
    echo Server will be available at: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
    goto :end
)

REM Check if Python 2 is available (py command)
where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using Python (py) to start web server...
    echo Server will be available at: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    py -m http.server 8000
    goto :end
)

REM Check if Node.js is available
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using Node.js to start web server...
    echo Server will be available at: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    node -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((req,res)=>{let f=req.url==='/'?'/index.html':req.url;let fp=path.join(__dirname,f);fs.readFile(fp,(err,data)=>{if(err){res.writeHead(404);res.end('Not Found');return;}let ext=path.extname(fp);let ct={'html':'text/html','css':'text/css','js':'application/javascript','json':'application/json'}[ext.slice(1)]||'text/plain';res.writeHead(200,{'Content-Type':ct});res.end(data);});}).listen(8000,()=>console.log('Server running at http://localhost:8000'));"
    goto :end
)

REM If nothing is available
echo.
echo ERROR: No suitable web server found!
echo.
echo Please install one of the following:
echo   - Python: https://www.python.org/downloads/
echo   - Node.js: https://nodejs.org/
echo.
echo After installation, run this script again.
echo.
pause
goto :end

:end
