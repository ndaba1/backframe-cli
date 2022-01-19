import program from "commander";
import chalk from "chalk";

program.version("1.0.0").description("The official backframe cli");

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
  .action((args, cmd) => {
    const PORT = args.port || 9000;
    console.log(
      `${chalk.green.bold(`🚀 Starting the server on port: ${PORT}....`)}`
    );
  });

program.on("--help", () => {
  console.log(
    `\nRun ${chalk.cyan(
      `bf <command> --help`
    )} for detailed usage of given command.\n`
  );
});

program.commands.forEach((c) => c.on("--help", () => console.log()));

export async function start(rawArgs) {
  const { enhanceErrorMessages } = require("../lib/util/handleErrors");

  enhanceErrorMessages("missingArgument", (argName) => {
    return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`;
  });

  enhanceErrorMessages("unknownCommand", (optionName) => {
    return `You have passed an unknown option .`;
  });

  program.parse(rawArgs);
}
