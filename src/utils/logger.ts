import logger from "pino";

const log = logger({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true, // Adiciona cores ao terminal
            translateTime: "SYS:yyyy-mm-dd HH:MM:ss.lp", // Define o formato do timestamp
            ignore: "pid,hostname", // Remove campos desnecessários
        },
    }
});

export default log;