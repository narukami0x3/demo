const jwt = require('jsonwebtoken')
const admin = require('../model/admin_model')

exports.time = async (req,res) => {
    const {id} = req.params
    const {start,expire,token} = req.body
    try{
        const tdecode = jwt.decode(token)
        if(tdecode.role != 1) return res.status(401).json({message: "access denind"})
        const startformat = new Date(start).toISOString().replace('T',' ').substring(0,19)
        const expireformat = new Date(expire).toISOString().replace('T',' ').substring(0,19)
        const row = await admin.time(startformat,expireformat,id)
        if(!row) return res.status(400).json({message: "time failed"})
        res.status(200).json({message: "time success"})
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR"})
    }
}

exports.getuser = async (req,res) => {
    const {token} = req.headers
    console.log(token)
    try{
        const tdecode = jwt.decode(token)
        console.log(tdecode)
        if(tdecode.role != 1) return res.status(401).json({message: "access denind"})
        const row = await admin.getuser()
        if(!row) return res.status(400).json({message: "getuser failed"})
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR"})
    }
}

exports.getuserresult = async (req,res) => {
    const {token} = req.headers
    console.log(token)
    try{
        const tdecode = jwt.decode(token)
        console.log(tdecode.id)
        if(tdecode.role != 1) return res.status(401).json({message: "access denind"})
        const row = await admin.getuserresult()
        if(!row) return res.status(400).json({message: "getuserresult failed"})
            console.log(row)
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR"})
    }
}

exports.boardsign = async (req,res) => {
    const {id} = req.params
    const {user_id,board_id,role,token} = req.body
    console.log(req.body)
    try{
        const tdecode = jwt.decode(token)
        if(tdecode.role != 1) return res.status(401).json({message: "access denind"})
        const row = await admin.boardsign(user_id,board_id,role,id)
        // if(!row) return res.status(400).json({message: "sign failed"})
        res.status(200).json({message: "sign success"})
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR"})
    }
}