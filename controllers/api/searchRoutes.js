const router = require('express').Router();
// const axios = require("axios");
const { Searches } = require('../../models');
const withAuth = require('../../utils/auth');
// function stockOverview(stock) {
router.post('/', withAuth, async (req, res) => {
  console.log('push')
  console.log(req.body);
  // try {
    const newProject = await Searches.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newProject);
    res.status(200).json(newProject);
  // } catch (err) {
  //   res.status(400).json(err);
  // }
});
// router.post('/', withAuth, async (req, res) => {
//   // Free 3rd Party API to Alpha Vantage (https://www.alphavantage.co/)

//   try {
//     const searchData = req.query.stock.trim();
//     await axios
//       .get("https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + searchData + "&apikey=" + process.env.API_KEY)
//       .then(
//         async function (response) {
//           // console.log(response);

//           // console.log(searchData);
//           // const newData = stockOverview(searchData);
//           if (searchData) {
//             newSearch = {
//               stock_name: response.data.Name,
//               stock_symbol: response.data.Symbol,
//               stock_country: response.data.Country,
//               stock_sector: response.data.Sector,
//               stock_exchange: response.data.Exchange,
//               stock_open: response.data["Global Quote"]["02. open"],
//               stock_high: response.data["Global Quote"]["03. high"],
//               stock_low: response.data["Global Quote"]["04. low"],
//               stock_price: response.data["Global Quote"]["05. price"],
//               // stock_description: overviewObj.stockDescription
//               user_id: req.session.user_id,
//             };
//           }
//           newData = await Searches.create({ newSearch });
//         }); res.redirect('dashboard', newData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
// });
// console.log("-----------------------")
// console.log(response.data);
// console.log("-----------------------")
// console.log(response.data.Name);
// console.log(response.data.Symbol);
// console.log(response.data.Country);
// console.log(response.data.Exchange);
// console.log(response.data.Sector);
// console.log(response.data.Description);
// console.log("-----------------------")
// let stockNameRes = response.data.Name;
// let stockSymbolRes = response.data.Symbol;
// let stockCountryRes = response.data.Country;
// let stockSectorRes = response.data.Exchange;
// let stockExchangeRes = response.data.Sector;
// let stockDescriptionRes = response.data.Description;
// let overviewObj = {
//   stockName: stockNameRes,
//   stockSymbol: stockSymbolRes,
//   stockCountry: stockCountryRes,
//   stockSector: stockSectorRes,
//   stockExchange: stockExchangeRes,
//   stockDescription: stockDescriptionRes

// return overviewObj
//       } 
//     )
// };
// stockOverview("NOW");

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const searchData = await Searches.destroy({
      where: {
        // id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!searchData) {
      res.status(404).json({ message: 'No search found with this id!' });
      return;
    }
    res.status(200).json(searchData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
