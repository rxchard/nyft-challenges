/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from 'winston'

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format:
    process.env.NODE_ENV === 'production'
      ? winston.format.combine(winston.format.splat(), winston.format.json())
      : winston.format.combine(
          winston.format.colorize(),
          winston.format.splat(),
          winston.format.simple(),
        ),
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    }),
  ],
  exceptionHandlers: [
    new winston.transports.Console({ handleExceptions: true }),
  ],
  exitOnError: false,
})

export function log(level: string, message: string, ...data: any[]): void {
  logger.log(level, message, ...data)
}

export function info(message: string, ...data: any[]): void {
  log('info', message, ...data)
}

export function debug(message: string, ...data: any[]): void {
  log('debug', message, ...data)
}

export function trace(message: string, ...data: any[]): void {
  log('debug', message, ...data)
}

export function error(message: string, ...data: any[]): void {
  log('error', message, ...data)
}

export function warn(message: string, ...data: any[]): void {
  log('warning', message, ...data)
}

//console.log = (...data: any[]) => info(data.join(' '))
