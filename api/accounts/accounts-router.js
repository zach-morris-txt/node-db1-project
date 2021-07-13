const express = require('express');

const Account = require('./accounts-model');
const router = express.Router();

const md = require('./accounts-middleware.js');


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
  res.json(req.account)
})

router.post('/', 
  md.checkAccountPayload, 
  md.checkAccountNameUnique, 
  async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.create(req.body)
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
    const data = await Account.deleteById(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => {
  // DO YOUR MAGIC
  res.status(err.status || 500).json({ message: err.message,})
})

module.exports = router;
