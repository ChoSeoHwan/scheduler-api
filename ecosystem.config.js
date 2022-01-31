let isProduction = false;
process.argv.forEach((arg, index) => {
    if (!arg.startsWith('--env')) return true;

    const environment = arg.split('=')[1] || process.argv[index + 1];
    if (environment === 'production') isProduction = true;

    return false;
});

let schedulerApiApp = {
    name: 'scheduler-api',
    script: `./dist/main.js`,
    exec_mode: 'cluster',
    wait_ready: true,
    listen_timeout: 30000,
    kill_timeout: 5000,
};

if (isProduction) {
    schedulerApiApp = {
        ...schedulerApiApp,
        instances: 0,
        env: {
            NODE_ENV: 'production'
        }
    }
} else {
    schedulerApiApp = {
        ...schedulerApiApp,
        instances: 1,
        watch: ['dist'],
        watch_delay: 1000,
        ignore_watch: ["node_modules"],
        env: {
            NODE_ENV: "development"
        }
    }
}

module.exports = {
    apps: [schedulerApiApp]
}