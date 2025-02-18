import Redis from "ioredis";
import config from 'config'

const redis = new Redis(config.get('redis.connection'))

export default redis