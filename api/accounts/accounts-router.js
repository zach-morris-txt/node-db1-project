const express = require('express')
const Account = require('./accounts-model')
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware')

const router = require('express').Router()

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.getAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getById(req.params.id)
    res.json(account)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.create(req.body)
    req.body.budget.trim()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.updateById(req.params.id, req.body)
    req.body.budget.trim()
    res.json(data)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.deleteById(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json({ message: err.message, stack: err.stack})
})

module.exports = router;
