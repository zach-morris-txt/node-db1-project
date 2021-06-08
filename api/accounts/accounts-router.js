const express = require('express')

//Purpose of Account her; pulls functions from model
const Account = require('./accounts-model')
const router = require('express').Router()

//Solution, Can Destructure Or Pull Off Of(md.'...name...')
const md = require('./accounts-middleware')




router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.getAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', 
  md.checkAccountId, 
  async (req, res, next) => {
  // DO YOUR MAGIC
  //Solution, Could've SImplified Code With Following
  res.json(req.account)
  // try {
  //   const account = await Account.getById(req.params.id)
  //   res.json(account)
  // } catch (err) {
  //   next(err)
  // }
})

router.post('/', 
  md.checkAccountPayload, 
  md.checkAccountNameUnique, 
  async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.create(req.body)
    //req.body.budget.trim()
    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', 
  md.checkAccountId, 
  md.checkAccountPayload, 
  async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.updateById(req.params.id, req.body)
    //req.body.budget.trim()
    res.json(data)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', 
  md.checkAccountId, 
  async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    //COULD ALSO; assume Alternative Delete in Accounts-Model:
    //await Account.deleteById(req.params.id)
    //res.json(req.account)
    const data = await Account.deleteById(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  //Solution, Adjusting tatus
  res.status(err.status || 500).json({ message: err.message, //stack: err.stack ?Purpose of Stack?
  })
})

module.exports = router;
