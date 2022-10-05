/* 

export const serverConfig = registerAs(
    SERVER_CONFIG,
    (): ServerConfigInterface => ({
        enviroment: process.env?.NODE_ENV ?? 'development',
        port:
        'string' === typeof process.env.PORT ? parseInt(process.env.port) : 3001,
        cors: {
            origin: process.env.CORS_ORIGIN
            ? process.env.CORS_ORIGIN
            : 'http://localhost:3600'
        }
    })
) */