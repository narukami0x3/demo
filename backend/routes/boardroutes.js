const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const ctrl = require('../controller/boardcontroller')

router.get('/getuser/:id',ctrl.getuser) // รับชื่อ user ที่ได้รับมอบหมายให้เป็นกรรมการผู้ประเมิน
router.get('/getformboard/:id',ctrl.getformboard) // รับ form ของผู้ประเมิน

router.post('/insertresult/:id',upload.single('sig'),ctrl.insertresult)

module.exports = router;    