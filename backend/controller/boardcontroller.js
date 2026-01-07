const jwt = require('jsonwebtoken')
const board = require('../model/board_model')
const dotenv = require('dotenv')

exports.getformboard = async (req,res) => {
    const {id} = req.params
    console.log(req.params

    )
    try{
        const row = await board.getformboard(id)
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR"})
    }
}

exports.getuser = async (req,res) => {
    const {id} = req.params
    const {token} = req.headers
    try{
        console.log(token)
        console.log(jwt.decode(token))
        const row = await board.getuser(id)
        if(!row) return res.status(404).json({message:"not found"})
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR"})
    }
}


exports.insertresult = async (req,res) => {
    const {id} = req.params
    console.log(req.body)
    try{
        const {score,sum,comment} = req.body
        const score1 = JSON.parse(score)
        const file = req.file
        let row2 = null
        row2 = await board.summary(id,sum,comment,file.filename,score1[0].user_id)
        if(row2 == null) return res.status(400).json({message: "insert sum failed"})
        let row = null
        for (item of score1){
            const row = await board.insertresult(id,item.score,item.form_id,item.user_id)
        }
        if(row == null) return res.status(400).json({message: "insert result failed"})
        res.status(200).json({message:"success"})
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR"})
    }
}