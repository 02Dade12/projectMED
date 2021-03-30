const router = require('express').Router();
const { Searches } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const searchData = req.query.stock.trim();
    console.log(searchData);

    if (searchData) {
      let newSearch = await Searches.create({
        user_id: req.session.user_id,
        text: searchData,
      })
    };

    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const searchData = await Searches.destroy({
      where: {
        id: req.params.id,
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
