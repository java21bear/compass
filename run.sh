#!/bin/bash
cd backend
java -jar build/libs/compass-0.0.1.jar > /dev/null 2>&1 &
BACKEND_PID=$!
cd ../frontend
npm run dev > /dev/null 2>&1 &
FRONTEND_PID=$!
sleep 1
open http://localhost:5173
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait
