const sequelize = require('../config/connection');
const { User, Searches } = require('../models');

const userData = require('./userData.json');
const searchData = require('./searchData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Searches.bulkCreate(searchData);

    process.exit(0);
};
seedDatabase();

