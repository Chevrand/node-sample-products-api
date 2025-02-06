import { container } from 'tsyringe';
import Database from '../database/database';
import logger from '../utils/logger';

const sql = container.resolve(Database).getConnection();

sql`
    CREATE TABLE IF NOT EXISTS users(
        id serial4 NOT NULL,
        name varchar(100) NOT NULL,
        email varchar(100) NOT NULL,
        password varchar(50) NOT NULL,
        active bool NOT NULL default true,
        created_at timestamptz NOT NULL default NOW(),
        updated_at timestamptz
    );
`.then(() => {
    logger.info('Database tables OK');
});