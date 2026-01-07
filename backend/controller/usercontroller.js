const jwt = require('jsonwebtoken')
const user = require('../model/user_model')
const dotenv = require('dotenv')
const { json } = require('express')


exports.getuser = async (req,res) => {
    const {id} = req.params
    try{
        const row = await user.getuser(id)
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR"})
    }
}


exports.getformuser = async (req,res) => {
    const {id} = req.params
    try{
        const row = await user.getformuser(id)
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR"})
    }
}

exports.getuserresult = async (req,res) => {
    const {id} = req.params
    try{
        const row = await user.getuserresult(id)
        res.status(200).json({data: row})
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR"})
    }
}

exports.insertresult = async (req,res) => {
    const {id} = req.params
    try{
        const {score,sum} = req.body
        const score1 = JSON.parse(score)
        let filename
        if(!req.file){
            filename = null
        }else{
            filename = req.file.filename
        }
        const row2 = await user.summary(id,sum,filename)
        if(!row2) return res.status(400).json({message: "insert sum failed"})
        let row
        for (item of score1){
            row = await user.insertresult(item.form_id,id,item.score,row2)
        }
        console.log(row)
        if(!row) return res.status(400).json({message: "insert result failed"})
        res.status(200).json({message: "success"})
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR"})
    }
}

exports.editprofile = async (req,res) => {
    const {id} = req.params
    const {username,gmail,phone} = req.body
    try{
        const row = await user.editprofile(username,gmail,phone,id)
        if(!row) return res.status(400).json({message: "edit failed"})
        res.status(200).json({message: "edit success"})
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR"})
    }
}
