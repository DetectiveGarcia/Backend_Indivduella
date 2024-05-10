const express = require('express')
const { register, login, registerAdmin, getOneUser } = require('../controllers/auth.controller.js')
const authenticate = require('../middlewares/authenticate.js')

const router = express.Router();

router.post('/registeradmin', registerAdmin)
router.post('/register', register)
router.post('/login', login)
router.get('/user', authenticate, getOneUser)

module.exports = router;
