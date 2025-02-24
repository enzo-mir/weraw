module.exports = {
  apps: [
    {
      name: "weraw",
      script: "./app/buil/bin/server.js",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
    },
  ],
};
