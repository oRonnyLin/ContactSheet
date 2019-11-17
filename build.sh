#!/bin/bash

cd my-app
npm run build
rm -rf ../backend/build
mv build ../backend/.
pm2 restart all