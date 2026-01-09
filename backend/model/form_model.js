const {pool} = require('./conn')

async function insertep(ep,weight,id) {
    let conn = await pool.getConnection()
    try{
        const row = await conn.query(
            "INSERT INTO ep (ep,weight,admin_id) VALUES (?,?,?)",
            [ep,weight,id]
        )
        return row.insertId
    }catch(e){
        console.log(e)
    }finally{conn.release()}
}

async function insertindicator(indicator,ep_id,id) {
    let conn = await pool.getConnection()
    try{
        const row = await conn.query(
            "INSERT INTO indicator (indicator,ep_id,admin_id) VALUES (?,?,?)",
            [indicator,ep_id,id]
        )
        return row.insertId
    }catch(e){
        console.log(e)
    }finally{conn.release()}
}

async function insertform(form,in_id,id) {
    let conn = await pool.getConnection()
    try{
        const row = await conn.query(
            "INSERT INTO form (form,indicator_id,admin_id) VALUES (?,?,?)",
            [form,in_id,id]
        )
        return row.insertId
    }catch(e){
        console.log(e)
    }finally{conn.release()}
}

async function deleteep(id) {
    let conn = await pool.getConnection()
    try{
        const row = await conn.query(
            "DELETE FROM ep WHERE ep_id = ?",
            [id]
        )
        return row
    }catch(e){
        console.log(e)
    }finally{conn.release()}
}

async function deleteindicator(id) {
    let conn = await pool.getConnection()
    try{
        const row = await conn.query(
            "DELETE FROM indicator WHERE indicator_id = ?",
            [id]
        )
        return row
    }catch(e){
        console.log(e)
    }finally{conn.release()}
}

async function deleteform(id) {
    let conn = await pool.getConnection()
    try{
        const row = await conn.query(
            "DELETE FROM form WHERE form_id = ?",
            [id]
        )
        return row
    }catch(e){
        console.log(e)
    }finally{conn.release()}
}

async function getformdata() {
    let conn = await pool.getConnection()
    try{
        const row1 = await conn.query(
            'SELECT * FROM ep'
        )
        const row2 = await conn.query(
            `SELECT
            e.ep_id,
            i.indicator_id,
            i.indicator
            FROM indicator i 
            JOIN ep e ON e.ep_id = i.ep_id`
        )
        const row3 = await conn.query(
            `SELECT
            i.indicator_id,
            f.form_id,
            f.detail
            FROM indicator i 
            JOIN form f ON f.indicator_id = i.indicator_id`
        )
        return [row1,row2,row3]
    }catch(e){
        console.log(e)
    }finally{conn.release()}   
}

async function checktime() {
    let conn = await pool.getConnection()
    try{
        const row = await conn.query(
            "SELECT * FROM time"
        )
        return row
    }catch(e){
        console.log(e)
    }finally{conn.release()}
}

module.exports = {insertform,insertep,insertindicator,getformdata,deleteep,deleteindicator,deleteform,checktime}
