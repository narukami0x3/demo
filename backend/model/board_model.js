const {pool} = require('./conn')

async function getformboard(id) {
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
            JOIN indicator i ON i.indicator_id = f.indicator_id`
        )
        const row4 = await conn.query(
            `SELECT
            r.form_id,
            r.selfscore,
            s.user_attachment
            FROM result r
            LEFT JOIN summary s ON s.user_id = r.user_id
            WHERE r.user_id = ? AND r.board_id IS NULL`,
            [id]
        )

        return [row1,row2,row3,row4]
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR getformuser"})
    }finally{conn.release()}
}

async function getuser(id) {
    let conn = await pool.getConnection()
    try{
        console.log(id)
        const row = await conn.query(
            `SELECT 
            b.user_id,
            u.username,
            d.department
            FROM board_sign b 
            JOIN users u ON u.user_id = b.user_id
            JOIN department d ON d.department_id = u.department
            WHERE b.board_id = ? AND status = 0`,
            [id]
        )
        return row
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR getformuser"})
    }finally{conn.release()}
}

async function insertresult(board_id,boardscore,form_id,user_id) {
    let conn = await pool.getConnection()
    try{
        const row = await conn.query(
            "UPDATE result SET board_id = ? , boardscore = ? WHERE form_id = ? AND user_id = ?",
            [board_id,boardscore,form_id,user_id]
        )
        const row1 = await conn.query(
            "UPDATE board_sign SET status = 1 WHERE user_id = ?",
            [user_id]
        )
        return row || null
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR getformuser"})
    }finally{conn.release()}
}

async function summary(id,sum,comment,file,user_id) {
    let conn = await pool.getConnection()
    try{
        const row2 = await conn.query(
            "UPDATE summary SET board_id = ? , board_sum = ? , board_comment = ? , board_signature = ? WHERE user_id = ?",
            [id,sum,comment,file,user_id]
        )
        return row2
    }catch(e){
        console.log(e)
        res.status(500).json({message: "ERROR getformuser"})
    }finally{conn.release()}
}
module.exports = {getformboard,insertresult,getuser,summary}