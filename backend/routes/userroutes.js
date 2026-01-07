const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const ctrl = require('../controller/usercontroller')

router.get('/getformuser/:id',ctrl.getformuser)
router.get('/getuser/:id',ctrl.getuser)
router.get('/getuserresult/:id',ctrl.getuserresult)

router.post('/insertresult/:id',upload.single('file'),ctrl.insertresult)

router.put('/editprofile/:id',ctrl.editprofile)

module.exports = router;    