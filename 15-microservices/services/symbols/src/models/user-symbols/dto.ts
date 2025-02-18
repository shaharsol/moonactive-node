import { RowDataPacket } from "mysql2/promise";
import Draft from "./draft";

// DTO - data transfer object
export default interface DTO extends RowDataPacket {
    id: string,
    userId: string,
    symbol: string
}