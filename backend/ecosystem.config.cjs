module.exports = {
  apps: [
    {
      name: 'vhrc-backend',
      script: './server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
        // Add other env variables here or load them from .env file
      }
    }
  ]
};
