import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import inquirer from "inquirer";
import chalk from "chalk";
import { getPromptModules } from "../lib/util/promptModules";

const access = promisify(fs.access);
const copy = promisify(ncp);

// TODO: create new folder with given name, handle errors appropriately
// TODO: run git init once prompts complete
// TODO: run npm init -y once git done
// TODO: check for package manager to use
// TODO: add dependencies to use for backframe
// TODO: generate/copy files
// TODO: run completion hooks
// TODO: transfer prompt functionality into its own module

export async function create(projectName, options) {
  console.log(options);
  if (!projectName) {
    const { appName } = await inquirer.prompt([
      {
        name: "appName",
        type: "input",
        message: `What name would you like to use for your new backframe project?`,
      },
    ]);
    projectName = appName;
  }

  // TODO: install package-name-validator for npm and validate the name

  const directory = options.cwd || process.cwd();
  const current = projectName === ".";
  const targetDir = path.join(directory, projectName || ".");

  if (current) {
    const { inCurrent } = await inquirer.prompt([
      {
        name: "inCurrent",
        type: "confirm",
        message: `Generate project in current directory: ${chalk.redBright.bold(
          targetDir
        )}`,
      },
    ]);

    if (!inCurrent) return;
  }

  if (fs.existsSync(targetDir)) {
    if (options.force) {
      fs.rm(targetDir, { recursive: true, force: true });
    } else {
      const { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: `Target directory ${chalk.redBright.bold(
            targetDir
          )} already exists. Pick an action:`,
          choices: [
            { name: "Overwrite", value: "overwrite" },
            { name: "Cancel", value: false },
          ],
        },
      ]);
      if (!action) {
        return;
      } else if (action === "overwrite") {
        console.log(`\n${chalk.green.dim(`Removing ${targetDir}...`)}\n`);
        fs.rm(targetDir, { recursive: true, force: true });
      }
    }
  }
  const cfg = await resolvePrompts();
  console.log(cfg);
  // initializeProject(projectName, targetDir, options);
}

async function resolvePrompts() {
  const questions = [];

  const modules = getPromptModules();
  modules.forEach((m) => {
    // FIXME: Implement a better way to check if the return value is an array
    if (m().length) questions.push(...m());
    else questions.push(m());
  });

  const answers = await inquirer.prompt(questions);
  return answers;
}

async function initializeProject(name, dest, ctx) {
  // TODO: Resolve presets
  if (ctx.preset) {
    console.log("object");
  }
}
