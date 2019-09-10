import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as dotenv from 'dotenv';
import { Allow } from 'class-validator';

export enum LoggerLevel {
    A0 = 'ALL',
}

class Logger {
    logger: winston.Logger;
    combine = winston.format.combine;
    timestamp = winston.format.timestamp;
    printf = winston.format.printf;
    constructor() {
        dotenv.config();
        const appName: string = process.env.APP_NAME;
        const logDir: string = process.env.LOG_DIR;
        const console = { level: 'debug', handleExceptions: true, json: false };
        const dailyRotateFile = { datePattern: 'YYYY-MM-DD', filename: `${logDir}/${appName}-%DATE%.log`, zippedArchive: true, json: true, level: 'debug' };
        const rotateFile = new DailyRotateFile(dailyRotateFile);
        this.logger = winston.createLogger({ format: this.logFileFormat(), transports: [rotateFile, new winston.transports.Console(console)], exitOnError: false });
    }
    logFileFormat() {
        return this.combine(this.timestamp(), this.printf(({ level, message, timestamp }) => {
            return `${timestamp} - ${level}: ${message}`;
        }));
    }
}
export default new Logger().logger;