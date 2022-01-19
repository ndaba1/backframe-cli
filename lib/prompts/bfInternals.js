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
  const prompt = {
    name: "Features",
    type: "checkbox",
    message: "Manually select any additional features:",
    choices: [
      "Enable web sockets",
      "Enable Clustering with PM2",
      "Allow metrics and analytics",
      "Automatic docusaurus generation",
      "Dockerize the server",
      "Integrate a CI/CD workflow",
    ],
  };

  return prompt;
};
