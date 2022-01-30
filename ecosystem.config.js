module.exports = {
    apps: [
        {
            name: 'scheduler-api',
            script: `./dist/main.js`,
            instances: 0,
            exec_mode: 'cluster',
            wait_ready: true,
            listen_timeout: 30000,
            kill_timeout: 5000,
            env: {
                "NODE_ENV": "development"
            },
            env_production: {
                "NODE_ENV": "production"
            }
        }

    ]
}