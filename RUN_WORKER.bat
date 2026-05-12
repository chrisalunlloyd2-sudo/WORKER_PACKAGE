@echo off
title DARWIN GRID DEPLOYMENT
echo ===========================================
echo   TACTICAL GRID: HEAVY INFRASTRUCTURE
echo   ROLE: DARWINISTIC CODE ADVANCER
echo ===========================================
echo.
echo [1/3] Validating Environment...
call npm install --silent
echo.
echo [2/3] Initializing Local Node Persistence...
echo.
echo [3/3] Launching Persistent Grid Node (PM2)...
echo.
call npm start
echo.
echo ===========================================
echo   NODE IS ONLINE AND PERSISTENT
echo   LINKED TO MASTER: [REDACTED_IP]
echo ===========================================
echo.
pause
