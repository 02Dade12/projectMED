const sequelize = require('../config/connection');
const { User, Searches } = require('../models');

const userData = require('./userData.json');
const searchData = require('./searchData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    Searches.bulkCreate(searchData);

    process.exit(0);
};
seedDatabase();

