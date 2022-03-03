#!/bin/bash
npm install # Install all dependencies
pm2 node src/Databaseconnection.js # Start the REST API for DB connection
pm2 start App.js


