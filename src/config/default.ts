import { IConfiguration } from '../interfaces/IConfiguration';

const config: IConfiguration = {
    port:3000,
    dbUri:process.env.NODE_SAMPLE_PRODUCTS_API_DB_URI ?? "",
    saltWorkFactor: 10
};

export default config;