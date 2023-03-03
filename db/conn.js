const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL || "postgres://localhost/guitar_api_db")

module.exports = conn;