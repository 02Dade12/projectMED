const form = document.querySelector('.new-project-form')
const display = document.querySelector('.off-canvas-content')
const displayCard = document.querySelector('.success')
const searchHist = document.querySelector('.is-active')

async function newSearchHandler(event) {
  event.preventDefault();
  const searchText = document.querySelector('#search').value.trim();
  var stockopen = '';
  var stockhigh = '';
  var stocklow = '';
  var stockprice = '';
  await axios
    .get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + searchText + "&apikey=" + "FMDXZ15JN39YTSUV")

    .then(
      function (response) {

        stockopen = response.data["Global Quote"]["02. open"];
        stockhigh = response.data["Global Quote"]["03. high"];
        stocklow = response.data["Global Quote"]["04. low"];
        stockprice = response.data["Global Quote"]["05. price"];

      }
    );

  await axios
    .get("https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + searchText + "&apikey=" + "FMDXZ15JN39YTSUV")
    .then(
      function (response) {
        if (response.data.Name) {
          axios.post('/api/searches',
            {
              stock_name: response.data.Name,
              stock_symbol: response.data.Symbol,
              stock_country: response.data.Country,
              stock_sector: response.data.Sector,
              stock_exchange: response.data.Exchange,
              stock_description: response.data.Description,
              stock_open: stockopen,
              stock_high: stockhigh,
              stock_low: stocklow,
              stock_price: stockprice,
            }
          ).then(function (response) {
            location.reload();
          })
        } else { return }
      }
    );
}

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

form.addEventListener('submit', newSearchHandler);
document.querySelector('.delete-button').addEventListener('click', delButtonHandler);