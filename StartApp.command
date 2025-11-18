#!/bin/bash
echo "Opening browser and starting server..."
cd "$(dirname "$0")"
npm install
open http://localhost:5000
npm run dev