const db = require("../database/dbConfig.js");

module.exports = {
    getAll,
    findById,
    findBy,
    add
}

function getAll() {
    return db('users')
}

function add(user) {
    return db('users')
        .insert(user)
}

function findBy(user) {
    return db('users')
        .where(user)
        .first()
}

function findById(id) {
    return db('users')
        .where({ id })
        .first()
}