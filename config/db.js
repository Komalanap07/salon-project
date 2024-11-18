
const mysql= require('mysql2');

// require('dotenv').config();  


const connection=mysql.createConnection({
    host: '192.168.1.142',       
    user: 'shinde_patil',         
    password: 'system',           
    database: 'saloon_project',
});


connection.connect((err) => {
    if(err) throw err;

    console.log('Connected to the database');
})

module.exports = connection;
