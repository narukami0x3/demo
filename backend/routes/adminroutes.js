const express = require('express')
const router = express.Router()
const ctrl = require('../controller/admincontroller')

router.get('/getuser',ctrl.getuser)
router.get('/getuserresult',ctrl.getuserresult)

router.put('/updatetime/:id',ctrl.time)

router.post('/boardsign/:id',ctrl.boardsign)

module.exports = router;