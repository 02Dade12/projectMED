const router = require('express').Router();
const { User, Searches } = require('../models');
const withAuth = require('../utils/auth');
// const axios = require("axios");
const dotenv = require('dotenv').config();



// Free 3rd Party API to Alpha Vantage (https://www.alphavantage.co/)
// function stockOverview(stock) {
//     axios
//       .get("https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + stock + "&apikey=" + process.env.API_KEY)
  
//       .then(
//         function (response) {
        
//           console.log("-----------------------")
//           console.log(response.data)ç
//           console.log("-----------------------")
//           console.log(response.data.Name);
//           console.log(response.data.Symbol);
//           console.log(response.data.Country);
//           console.log(response.data.Exchange);
//           console.log(response.data.Sector);
//           console.log(response.data.Description);
//           console.log("-----------------------")

//           let stockName = response.data.Name;
//           let stockSymbol = response.data.Symbol;
//           let stockCountry = response.data.Country;
//           let stockSector = response.data.Exchange;
//           let stockExchange = response.data.Sector;
//           let stockDescription = response.data.Description;

//         }
//       )
//   };
  
//   stockOverview("now");

//   function dailySeries(stock) {
//     axios
//     .get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + stock + "&apikey=" + process.env.API_KEY)

//     .then(
//       function (response) {

//         console.log("-----------------------")
//         console.log(response.data);
//         console.log("-----------------------")
//         console.log(response.data["Global Quote"]["02. open"]);
//         console.log(response.data["Global Quote"]["03. high"]);
//         console.log(response.data["Global Quote"]["04. low"]);
//         console.log(response.data["Global Quote"]["05. price"]);
//         console.log("-----------------------")

//         let stockOpen = response.data["Global Quote"]["02. open"];
//         let stockHigh = response.data["Global Quote"]["03. high"];
//         let stockLow = response.data["Global Quote"]["04. low"];
//         let stockPrice = response.data["Global Quote"]["05. price"];

//       }
//     ); 
//   };

//   dailySeries('now');

router.get('/', async (req, res) => {
  try {
    const searchData = await Searches.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ]
    });

    const searches = searchData.map((searches) => searches.get({ plain: true }));

    res.render('homepage', {
      searches,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/searches/:id', async (req, res) => {
  try {
    const searchData = await Searches.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const searches = searchData.get({ plain: true });

    res.render('dashboard', {
      ...searches,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Searches,
        order: [['id', 'DESC']], }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;