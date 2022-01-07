import program from "commander";
import chalk from "chalk";

program.version("1.0.0").description("The version of the backframe cli");

program
  .command("new <app-name>")
  .alias("n")
  .description("Creates a new backframe project")
  .option("-p, --preset <presetName>", "Pass the path to custom bf-config.json")
  .option("-d, --default", "Skip prompts and use default preset")
  .option("-g, --git ", "Initialize the project with git")
  .option("-n, --no-git", "Skip git initialization")
  .option("-f, --force", "Overwrite target directory if it exists")
  .action((appName, cmd) => {
    require("../commands/new").create(appName, cmd);
  });

program
  .command("start")
  .description("Start the backframe server on port 9000")
  .action(() => {
    console.log("Starting the server...");
  });

export async function start(rawArgs) {
  const enhanceErrorMessages = require("../lib/util/enhanceErrorMessages");

  enhanceErrorMessages("missingArgument", (argName) => {
    return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`;
  });

  program.parse(rawArgs);
}
