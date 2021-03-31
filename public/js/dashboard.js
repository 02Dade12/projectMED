const axios = require("axios");
var text = document.querySelector('form');

const newSearchHandler = async () => {
  // event.preventDefault();
var searchText = document.querySelector('#search').value.trim();

  // const name = document.querySelector('#project-name').value.trim();
  // const needed_funding = document.querySelector('#project-funding').value.trim();


await stockOverview(searchText);
await dailySeries(searchText);



  // if (name && needed_funding && description) {
  //   const response = await fetch(`/api/searches`, {
  //     method: 'POST',
  //     body: JSON.stringify({ name, needed_funding, description }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   if (response.ok) {
  //     document.location.replace('/dashboard');
  //   } else {
  //     alert('Failed to create searches');
  //   }
  // }
};
function stockOverview(stock) {
  axios
    .get("https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + stock + "&apikey=" + process.env.API_KEY)

    .then(
      function (response) {
      
        console.log("-----------------------")
        console.log(response.data);
        console.log("-----------------------")
        console.log(response.data.Name);
        console.log(response.data.Symbol);
        console.log(response.data.Country);
        console.log(response.data.Exchange);
        console.log(response.data.Sector);
        console.log(response.data.Description);
        console.log("-----------------------")

        let stockName = response.data.Name;
        let stockSymbol = response.data.Symbol;
        let stockCountry = response.data.Country;
        let stockSector = response.data.Exchange;
        let stockExchange = response.data.Sector;
        let stockDescription = response.data.Description;

      }
    )
};

stockOverview("now");

function dailySeries(stock) {
  axios
  .get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + stock + "&apikey=" + process.env.API_KEY)

  .then(
    function (response) {

      console.log("-----------------------")
      console.log(response.data);
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

    }
  ); 
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/searches/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete searches');
    }
  }
};

text.addEventListener('submit', newSearchHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
