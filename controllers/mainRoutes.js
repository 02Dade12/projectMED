const router = require('express').Router();
const { User, Searches } = require('../models');
const withAuth = require('../utils/auth');
const axios = require("axios");
const dotenv = require('dotenv').config();



// Free 3rd Party API to Alpha Vantage (https://www.alphavantage.co/)
function stockOverview(stockName) {
  axios
    .get("https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + stockName + "&apikey=" + process.env.API_KEY)

    .then(
      function (response) {
        console.log(response);
      }
    )
};

// stocksOverview("now");

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

router.get('/search/:id', async (req, res) => {
  try {
    const searchData = await Searches.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const search = searchData.get({ plain: true });

    res.render('search', {
      ...search,
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
      include: [{ model: Search }],
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