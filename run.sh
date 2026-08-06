#!/bin/bash
cd backend
set -a
if [ -f ".env.local" ]; then
  source .env.local
elif [ -f ".env" ]; then
  source .env
else
  exit 1
fi
set +a
if [ ! -f build/libs/compass-0.0.1.jar ]; then
  ./gradlew build
fi
java -jar build/libs/compass-0.0.1.jar > /dev/null 2>&1 &
BACKEND_PID=$!
cd ../frontend
if [ ! -d "node_modules" ]; then
  npm install
fi
npm run dev > /dev/null 2>&1 &
FRONTEND_PID=$!
sleep 1
open http://localhost:5173
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait
