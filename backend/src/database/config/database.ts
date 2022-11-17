import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '415263',
  database: process.env.DB_NAME || 'ng_db',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  dialect: 'postgres',
  timezone: '+03:00',
  dialectOptions: {
    useUTC: false,
    dateStrings: true,
    typeCast: true
  },
};

export = config;
