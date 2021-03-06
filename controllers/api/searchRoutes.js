const router = require('express').Router();
const { Searches } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  console.log('push')
  console.log(req.body);
    const newProject = await Searches.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newProject);
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const searchData = await Searches.destroy({
      where: {
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
