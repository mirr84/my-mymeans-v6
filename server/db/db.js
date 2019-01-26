const mysql = require('promise-mysql');

const config = {
    host: '127.0.0.1',
    user: 'my-mymeans-v6',
    password: 'my-mymeans-v6',
    database: 'my-mymeans-v6'
}

const connector = () => mysql.createConnection(config)

module.exports = ({connector});