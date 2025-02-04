import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

async function connect() {
    const dbUri = config.get<string>("dbUri");

    try {
        await mongoose.connect(dbUri)
        logger.info("App connected to database");
    } catch (error) {
        let errorMessage = "";
        if (error instanceof Error) errorMessage = error.message;

        logger.error(`App could not connect to database: ${errorMessage}`);
        process.exit(1);
    }
}

export default connect;