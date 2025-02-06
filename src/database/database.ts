import postgres from 'postgres';
import config from '../config/default';
import logger from '../utils/logger';
import { singleton } from 'tsyringe';

@singleton()
class Database {

    private dbUri: string;
    private sql: ReturnType<typeof postgres>;

    constructor() {
        try {
            this.dbUri = config.dbUri;
            this.sql = postgres(this.dbUri, {
                ssl: 'require',
                idle_timeout: 10,
                max_lifetime: 60 * 30,
                max: 10,
            });

            logger.info("App connected to database");
        } catch (error) {
            let errorMessage = "";
            if (error instanceof Error) errorMessage = error.message;

            logger.error(`App could not connect to database: ${errorMessage}`);
            process.exit(1);
        }
    }

    getConnection() {
        return this.sql;
    }
}

export default Database;