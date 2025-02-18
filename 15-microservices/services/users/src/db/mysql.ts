import { createPool } from "mysql2/promise";
import config from 'config'

const pool = createPool(config.get('mysql'))

export default pool