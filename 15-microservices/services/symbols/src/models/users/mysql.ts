import { v4 } from "uuid";
import pool from "../../db/mysql";
import Draft from "./draft";
import DTO from "./dto";
import Model from "./model";
import { ResultSetHeader } from "mysql2";

class Mysql implements Model {
    async login(githubId: string): Promise<DTO> {
        const result = await pool.query<DTO[]>(`
            select  *
            from    users
            where   github_id = ?
        `, [githubId])

        const user = result[0][0]

        return user
    }

    async signup(draft: Draft): Promise<DTO> {
        const id = v4()
        const { githubId, name } = draft
        const result = await pool.query<ResultSetHeader>(`
            insert into users (id, github_id, name)
            values(?, ?, ?)
        `, [id, githubId, name])

        return this.login(githubId)
    }
    
}

export default new Mysql()