
const router = require('express').Router()

const { create, readAll, readSingle, update, remove } = require('../controllers/userController')

// Create User
router.post('/api', create)

// Retrieve All User
router.get('/api', readAll);

// Retrieve Single User
router.get('/api/:userId', readSingle);

// Update
router.put('/api/:userId', update);

// Delete
router.delete('/api/:userId', remove);

module.exports = router
