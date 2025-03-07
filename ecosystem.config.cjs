module.exports = {
  apps: [
    {
      name: "weraw",
      script: "./bin/server.js",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
    },
  ],
};
