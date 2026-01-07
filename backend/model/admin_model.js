const {pool} = require('./conn')

async function time(start,expire,id) {
    let conn = await pool.getConnection()
    try{
        const row = await conn.query(
            "UPDATE time SET start = ? , expire = ? , admin_id = ? WHERE time_id = 1",
            [start,expire,id]
        )
        return row.affectedRows
    }catch(e){
        console.log(e)
    }finally{conn.release()}
}

async function getuser() {
    let conn = await pool.getConnection()
    try{
       const row1 = await conn.query(
            `SELECT 
            u.user_id,
            u.username,
            d.department_id,
            d.department
            FROM users u
            JOIN department d ON d.department_id = u.department
            WHERE u.role = 3 AND u.user_id IN (SELECT user_id FROM summary WHERE board_id IS NULL)
            `
        )
        const row2 = await conn.query(
            `SELECT 
            u.user_id,
            u.username,
            d.department_id,
            d.department
            FROM users u
            JOIN department d ON d.department_id = u.department
            WHERE u.role = 3
            `
        )
        return [row1,row2]
    }catch(e){
        console.log(e)
    }finally{conn.release()}
}

async function getuserresult() {
    let conn = await pool.getConnection()
    try{
        const row = await conn.query(
            `
            SELECT 
            u.username AS user_username,
            b.username AS board_username,
            s.user_sum,
            s.board_sum,
            s.board_comment
            FROM summary s
            LEFT JOIN users u ON u.user_id = s.user_id
            LEFT JOIN users b ON b.user_id = s.board_id
            `
        )
        console.log(row)
        return row
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR getformuser"})
    }finally{conn.release()}
}

async function boardsign(user_id,board_id,role,admin_id) {
    let conn = await pool.getConnection()
    try{
        const row = await conn.query(
            "INSERT INTO board_sign (user_id,board_id,board_role,admin_id) VALUES (?,?,?,?)",
            [user_id,board_id,role,admin_id]
        )
        return row.insertId
    }catch(e){
        console.log(e)
    }finally{conn.release()}
}
module.exports = {time,boardsign,getuser,getuserresult}