import Sequelize from 'sequelize'

// Option 1: Passing parameters separately
const db = new Sequelize('fullstack', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default db;