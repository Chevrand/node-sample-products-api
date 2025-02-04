import { Configuration } from '../models/Configuration';

const config: Configuration = {
    port:1337,
    dbUri:process.env.NODE_SAMPLE_PRODUCTS_API_DB_URI ?? ""
};

export default config;