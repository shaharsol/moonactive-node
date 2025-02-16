import { RowDataPacket } from "mysql2/promise";

export default interface DistinctSymbol extends RowDataPacket {
    symbol: string
}