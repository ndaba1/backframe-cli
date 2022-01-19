// TODO: Implement manually selecting features
/**
 * Websockets
 * Metrics and Analytics
 * Clustering with PM2
 * Build with docker
 * CI/CD pipeline with GHA/Travis CI
 * docs generation!!
 */
module.exports = () => {
  const features = [
    { name: "Enable web sockets", value: "sockets" },
    { name: "Enable clustering with PM2", value: "clustering" },
    { name: "Allow for server analytics", value: "analytics" },
    { name: "Automatics docusaurus generation", value: "docs" },
    { name: "Dockerize the server", value: "docker" },
  ];

  const prompt = {
    name: "Features",
    type: "checkbox",
    message: "Manually select any additional features:",
    choices: [...features],
  };

  return prompt;
};
