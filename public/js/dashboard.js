// const axios = require("axios");
const form = document.querySelector('.new-project-form')
const display = document.querySelector('.off-canvas-content')
const displayCard = document.querySelector('.success')
const searchHist = document.querySelector('.is-active')

async function newSearchHandler(event) {
  event.preventDefault();
  const searchText = document.querySelector('#search').value.trim();
  await axios
    .get("https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + searchText + "&apikey=" + "2V72ME51BOFXRYCJ")
    .then(
      function (response) {
        console.log(response);
        if (response.data.Name) {
          axios.post('/api/searches',
            {
              stock_name: response.data.Name,
              stock_symbol: response.data.Symbol,
              stock_country: response.data.Country,
              stock_sector: response.data.Sector,
              stock_exchange: response.data.Exchange,
              stock_description: response.data.Description,
            }
          ).then(function (response) {
            console.log(response);
            location.reload();
          })
        } else { return }
      }
    );
}
// stockOverview("now");

// async function newSearchHandlerTwo(event) {
//   event.preventDefault();
//   const searchText = document.querySelector('#search').value.trim();
//   await axios
//     .get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + stock + "&apikey=" + "2V72ME51BOFXRYCJ")
//     .then(
//       function (response) {
//         console.log(response);
//         if (response.data.Name) {
//           axios.post('/api/searches',
//             {
//               stock_open: response.data["Global Quote"]["02. open"],
//               stock_high: response.data["Global Quote"]["03. high"],
//               stock_low: response.data["Global Quote"]["04. low"],
//               stock_price: response.data["Global Quote"]["05. price"],
//             }
//           ).then(function (response) {
//             console.log(response);
//             location.reload();
//           })
//         } else { return }
//       }
//     );
// }




form.addEventListener('submit', newSearchHandler);
// form.addEventListener('submit', newSearchHandlerTwo);


// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);

          // console.log("-----------------------");
          // console.log(response.data);
          // console.log("-----------------------");
          // console.log(response.data.Name);
          // console.log(response.data.Symbol);
          // console.log(response.data.Country);
          // console.log(response.data.Exchange);
          // console.log(response.data.Sector);
          // console.log(response.data.Description);
          // console.log("-----------------------");
          // console.log("-----------------------");
          // console.log(response.data);
          // console.log("-----------------------");
          // // console.log(response.data["50DayMovingAverage"]);
          // // console.log(response.data["52WeekHigh"]);
          // // console.log(response.data["52WeekLow"]);
          // // console.log(response.data["200DayMovingAverage"]);
          // console.log("-----------------------");

          // // stockopen = response.datalobal["50DayMovingAverage"];
          // // stockhigh = response.data["52WeekHigh"];
          // // stocklow = response.data["52WeekLow"];;
          // // stockprice = response.data["200DayMovingAverage"];


// const name = document.querySelector('#project-name').value.trim();
// const needed_funding = document.querySelector('#project-funding').value.trim();
// stock_high: stockhigh,
// stock_low: stocklow,
// stock_price: stockprice

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

 // if (searchText) {
  //   const stock_name = stockname;
  //   const stock_symbol = stocksymbol;
  //   const stock_country = stockcountry;
  //   const stock_sector = stocksector;
  //   const stock_exchange = stockexchange;
  //   const stock_open = stockopen;
  //   const response = await fetch(`/api/searches`, {
  //     method: 'POST',
  //     body: JSON.stringify({ stock_name, stock_symbol, stock_country, stock_sector, stock_exchange, stock_open }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   if (response.ok) {
  //     document.location.replace('/dashboard');
  //   } else {
  //     alert('Failed to create project');
  //   }
  // }

  // var stockname = '';
// var stocksymbol = '';
// var stockcountry = '';
// var stocksector = '';
// var stockexchange = '';
// var stockdescription = '';
// var stockopen = '';
// var stockhigh = '';
// var stocklow = '';
// var stockprice = '';


async function delButtonHandler(event) {
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
}

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



const newDisplay = async => {
  display.remove();
}