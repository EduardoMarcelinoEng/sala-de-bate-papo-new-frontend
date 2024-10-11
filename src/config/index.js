const env = process.env.NODE_ENV;

const configs = {
    development: {
        host: 'http://localhost:8888'
    },
    production: {
        host: ''
    }
}

export default {
    ...configs[env]
}