const multer = require('multer')
const path = require('path')
const type = {
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'application/pdf': 'pdf'
}
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        const isValid = type[file.mimetype]
        console.log(file.mimetype)
        let ERROR = new Error('invild file type')
        if(isValid){
            ERROR = null
        }
        let dir
        if(file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'){
           dir = 'images' 
        }else{
            dir = 'docs'
        }
        cb(ERROR,path.join(__dirname,"..","upload",dir))
    },
    filename: function (req,file,cb){
        const filename = Buffer.from(file.originalname, 'latin1').toString('utf8')
        cb(null,`${Date.now()}-${filename}`)
    }
})

const uploadOption = multer({storage})

module.exports = uploadOption;