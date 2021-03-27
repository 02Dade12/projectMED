const router = require('express').Router();
// const { User, Searches } = require('../models');
// const withAuth = require('../utils/auth');
const axios = require("axios");
const dotenv = require('dotenv').config();

function stockOverview(stockName) {
    axios
      .get("https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + stockName + "&apikey=" + process.env.API_KEY)
  
      .then(
        function (response) {
          // console.log(response.data);
          console.log(response.data.Name);
          console.log(response.data.Symbol);
          console.log(response.data.Description);
          console.log(response.data.Country);
          console.log(response.data.Sector);
        }
      )
  };
  
  stockOverview("now");

  function dailySeries(stockName) {
    axios
    .get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + stockName + "&apikey=" + process.env.API_KEY)

    .then(
      function (response) {
          console.log(response.data);
          console.log("-----------------------")
        console.log(response.data["Global Quote"]["01. symbol"]);
        console.log("-----------------------")
        console.log("-----------------------")
        console.log(response.data["Global Quote"]["02. open"]);
        console.log(response.data["Global Quote"]["03. high"]);
        console.log(response.data["Global Quote"]["04. low"]);
        console.log(response.data["Global Quote"]["05. price"]);

        console.log("-----------------------")
        let stockOpen = response.data["Global Quote"]["02. open"];
        let stockHigh = response.data["Global Quote"]["03. high"];
        let stockLow = response.data["Global Quote"]["04. low"];
        let stockPrice = response.data["Global Quote"]["05. price"];

        stockOpen;
        stockHigh;
        stockLow;
        stockPrice;
      }
    ); 
  };

  dailySeries('now');