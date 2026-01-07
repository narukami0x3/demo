const {pool} = require('./conn')

async function getformuser(id) {
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
            FROM form f
            JOIN indicator i ON i.indicator_id = f.indicator_id
            WHERE f.form_id NOT IN (SELECT form_id FROM result WHERE user_id = ?)`,
            [id]
        )
        return [row1,row2,row3]
    }finally{conn.release()}
}

async function getuser(id) {
    let conn = await pool.getConnection()
    try{
         const row1 = await conn.query(
            'SELECT username,gmail,phone FROM users where user_id = ?',
            [id]
        )
        
        return row1
    }finally{conn.release()}
}

async function insertresult(form_id,id,selfscore,sum_id) {
    let conn = await pool.getConnection()
    try{
        const row = await conn.query(
            "INSERT INTO result (form_id,user_id,selfscore,sum_id) VALUES (?,?,?,?)",
            [form_id,id,selfscore,sum_id]
        )
        // const row2 = await conn.query(
        //     "SELECT LAST_INSERT_ID() AS id"
        // )
        return Number(row.affectedRows)
    }finally{conn.release()}
}
async function summary(id,sum,file) {
    let conn = await pool.getConnection()
    try{
        const row2 = await conn.query(
            "INSERT INTO summary (user_id,user_sum,user_attachment) VALUES (?,?,?)",
            [id,sum,file]
        )
        const row = await conn.query(
            "SELECT LAST_INSERT_ID() AS id"
        )
        return Number(row[0].id)
    }finally{conn.release()}
}

async function getuserresult(id) {
    let conn = await pool.getConnection()
    try{
         const row = await conn.query(
            `SELECT 
            u.username AS user_username,
            b.username AS board_username,
            s.user_sum,
            s.board_sum,
            s.board_comment
            FROM summary s
            JOIN users u ON u.user_id = s.user_id
            LEFT JOIN users b ON b.user_id = s.board_id
            WHERE s.user_id = ?
            `,
            [id]
        )
        console.log(row)
        return row
    }finally{conn.release()}
}

async function uploadtest(filename) {
    let conn = await pool.getConnection()
    try{
         const row = await conn.query(
            `INSERT INTO uploadtest (filename) VALUES (?)
            `,
            [filename]
        )
        return row.insertId
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR upload"})
    }finally{conn.release()}
}

async function editprofile(usrename,email,phone,id) {
    let conn = await pool.getConnection()
    try{
        const row2 = await conn.query(
            "UPDATE users SET username = ? , gmail = ? , phone = ? WHERE user_id = ?",
            [usrename,email,phone,id]
        )
        return row2
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR getformuser"})
    }finally{conn.release()}
}

module.exports = {getformuser,insertresult,getuserresult,uploadtest,summary,editprofile,getuser}