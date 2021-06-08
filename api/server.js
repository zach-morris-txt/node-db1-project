const express = require("express");

//Solution, Forgot To Pull In AccountsRouter
// *MUST be connected between server.use('*)' and server.use(express.json()) to function properly* 
const accountsRouter = require('./accounts/accounts-router')

const server = express();

server.use(express.json());

//Solution, Forgot To Connect AccountsRouter
server.use('/api/accounts', accountsRouter)

//Solution, Optional Catch All
server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found',
    })
})

module.exports = server;
