# Scraping and Twilio Text Notifications

This project Gets the html content of a website, stores it on a text file and next time it runs it compares the html received against the text file previously saved. If it's different,it sends out a text message to a number specified on the .env file.

To get started, change the name of **.env-default** to **.env** and set your twilio credentials, phone numbers, and website you would like to scrape.


## Scripts to run on your terminal
***You must have [Node.js](https://nodejs.org/en/) installed to use this project***

```
npm install
npm start
```