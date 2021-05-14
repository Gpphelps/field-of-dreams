const { User } = require('../models');

const userData = [
    {
        username: 'Merlin',
        email: 'merlinTheWizard@gmail.com',
        password: 'merlinspassword',
    },
    {
        username: 'Harry',
        email: 'harryTheWizard@gmail.com',
        password: 'harryspassword',
    },
    {
        username: 'Gandalf',
        email: 'gandalfTheWizard@gmail.com',
        password: 'gandalfspassword',
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;