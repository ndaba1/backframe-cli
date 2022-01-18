import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import inquirer from "inquirer";
import chalk from "chalk";

const access = promisify(fs.access);
const copy = promisify(ncp);

// TODO: create new folder with given name, handle errors appropriately
// TODO: run git init once prompts complete
// TODO: run npm init -y once git done
// TODO: check for package manager to use
// TODO: add dependencies to use for backframe
// TODO: generate/copy files
// TODO: run completion hooks
async function promptForOptions(options) {
  const questions = [];
  questions.push({
    type: "checkbox",
    name: "APIs",
    message: "What API(s) would you like to implement?",
    choices: ["GraphQL", "REST", "RPC", "SOAP"],
  });

  questions.push({
    type: "list",
    name: "Database",
    message: "Select a database:",
    choices: ["MongoDB", "MariaDB", "MySQL", "Redis", "Elasticsearch"],
    default: "MongoDB",
  });

  questions.push({
    type: "confirm",
    name: "Firebase",
    message: "Would you connect your project with firebase?",
  });

  const answers = await inquirer.prompt(questions);
  console.log(answers);
}

export async function create(projectName, options) {
  // TODO: install package-name-validator for npm and validate the name

  if (!projectName) {
    const answer = await inquirer.prompt([
      {
        name: "app-name",
        type: "input",
        message: `What name would you like to use for the project?`,
      },
    ]);
    projectName = answer["app-name"];
  }

  const directory = options.cwd || process.cwd();
  const current = projectName === ".";
  const targetDir = path.resolve(directory, projectName || ".");

  if (fs.existsSync(targetDir)) {
    const { action } = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: `Target directory ${targetDir} already exists. Pick an action:`,
        choices: [
          { name: "Overwrite", value: "overwrite" },
          { name: "Merge", value: "merge" },
          { name: "Cancel", value: false },
        ],
      },
    ]);
    if (!action) {
      return;
    } else if (action === "overwrite") {
      console.log(`\nRemoving ${targetDir}...`);
      await fs.remove(targetDir);
    }
  } else {
    await promptForOptions(options);
  }
}
