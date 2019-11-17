#!/bin/bash

cd my-app
npm run build
rm -rf ../backend/build
mv build ../backend/.