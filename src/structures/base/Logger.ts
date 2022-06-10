import pino, { LoggerOptions } from 'pino'

export default class Logger {
  constructor (options?: LoggerOptions) {
    try {
      require.resolve('pino-pretty')
    } catch (error) {
      options.prettyPrint = false
    }

    return pino({
      name: options?.name || 'Retromada',
      level: options?.level || 'debug',
      timestamp: () =>
        `,"time":"${new Date().toLocaleTimeString('en-US', {
          hour12: false
        })}"`,
      messageKey: 'message',
      nestedKey: 'payload',
      ...(options?.prettyPrint && { transport: { target: 'pino-pretty' } })
    })
  }
}
