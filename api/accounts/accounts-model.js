const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

async function getById(id) {
  // DO YOUR MAGIC
  const result = await db('accounts')
    .where('id', id).first() //First brings individual rather than collection
  return result
}
  //Alternative:
  // const getById = id => {
  //   // DO YOUR MAGIC
  //   return db('accounts').where('id', id).first() //First brings individual rather than collection
  // }

const create = async account => {
  // DO YOUR MAGIC
  const [id] = await db('accounts')
    .insert(account)
  return getById(id)
}

async function updateById(id, {name, budget}) {
  // DO YOUR MAGIC
  await db('accounts')
    .where('id', id)
    .update({name, budget})
  return getById(id)
}

async function deleteById(id) {
  // DO YOUR MAGIC
  const toDelete = await getById(id)
  await db('accounts')
    .where({id})
    .del()
  return toDelete
}
  //Alternative:
  // const deleteById = id => {
  //   return db('accounts').where('id', id).del()
  // }

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
