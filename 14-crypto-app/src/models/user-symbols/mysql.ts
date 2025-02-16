import { v4 } from "uuid";
import pool from "../../db/mysql";
import Draft from "./draft";
import DTO from "./dto";
import Model from "./model";
import { ResultSetHeader } from "mysql2";

class Mysql implements Model {
    async getPerUser(id: string): Promise<DTO[]> {
        const result = await pool.query<DTO[]>(`
            SELECT * from user_symbols 
            where user_id = ?
        `, [ id ])

        return result[0]
    }

    async add(draft: Draft): Promise<DTO> {
        
        const id = v4()
        const { userId, symbol } = draft

        const result = await pool.query<ResultSetHeader>(`
            insert into user_symbols(id, user_id, symbol)
            values (?, ?, ?)
        `, [id, userId, symbol])

        // from ResultSetHeader i will usually
        // need the affectedRows or insertId
        const affectedRows = result[0].affectedRows

        const newUserSymbol = await pool.query<DTO[]>(`
            select  *
            from    user_symbols
            where   user_id = ?
        `, [ id ])    

        return newUserSymbol[0][0]
    }
}

// TypeScript noble way of implementing singleton
export default new Mysql()