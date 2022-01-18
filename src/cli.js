import program from "commander";
import chalk from "chalk";

program.version("1.0.0").description("The version of the backframe cli");

program
  .command("new <app-name>")
  .alias("n")
  .description("Creates a new backframe project in current directory")
  .option("-p, --preset <presetName>", "Pass the path to custom bf-config.json")
  .option("-d, --default", "Skip prompts and use default preset")
  .option("-g, --git ", "Initialize the project with git")
  .option("-n, --no-git", "Skip git initialization")
  .option("-f, --force", "Overwrite target directory if it exists")
  .action((appName, cmd) => {
    require("../commands/new").create(appName, cmd);
  });

program
  .command("serve")
  .option(
    "-p, --port <portNumber>",
    "Pass the custom port number to start the server on"
  )
  .option(
    "-o, --open",
    "Open the server address in a browser window, default is false"
  )
  .description(
    "Starts the backframe server present in the current directory on port 9000"
  )
  .action(() => {
    console.log("Starting the server...");
  });

export async function start(rawArgs) {
  const { enhanceErrorMessages } = require("../lib/util/handleErrors");

  enhanceErrorMessages("missingArgument", (argName) => {
    return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`;
  });

  program.parse(rawArgs);
}
