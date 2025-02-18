import { RowDataPacket } from "mysql2/promise";

export default interface DTO extends RowDataPacket {
    id: string,
    githubId: string,
    name: string
}