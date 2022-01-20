import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import inquirer from "inquirer";
import chalk from "chalk";
import { getPromptModules } from "../lib/util/promptModules";
import Listr from "listr";
import writeFiles from "../lib/util/writeFiles";

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

  if (fs.existsSync(targetDir)) {
    if (options.force) {
      fs.rm(targetDir, { recursive: true, force: true });
    } else {
      if (current) {
        const { inCurrent } = await inquirer.prompt([
          {
            name: "inCurrent",
            type: "confirm",
            message: `Generate project in current directory: ${chalk.blue.bold(
              targetDir
            )}`,
          },
        ]);

        if (!inCurrent) return;
      } else {
        const { action } = await inquirer.prompt([
          {
            name: "action",
            type: "list",
            message: `Target directory ${chalk.blue.bold(
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
          fs.rmSync(targetDir, { recursive: true, force: true });
        }
      }
    }
  }

  let cfg;

  if (options.default) {
    cfg = {
      apis: "rest",
      database: "mongodb",
      "auth-providers": "email-local",
      internals: "analytics",
    };
  } else if (options.preset) {
    try {
      await access(options.preset, fs.constants.R_OK);
    } catch (e) {
      console.log(
        `${chalk.red(
          `An error occurred when trying to load preset: ${chalk.yellow(
            options.preset
          )}`
        )}`
      );
      console.log(e.message);
      return;
    }
    cfg = JSON.parse(fs.readFileSync(options.preset).toString());
  } else {
    cfg = await resolvePrompts();
  }

  // Save bfconfig.json file
  if (cfg.SavePreset) {
    delete cfg.SavePreset;
    writeFiles(targetDir, { "bfconfig.json": JSON.stringify(cfg, null, 2) });
  }

  const tasks = new Listr([
    {
      title: `🌟 Creating new project in ${chalk.green.bold(targetDir)}`,
      task: () => initializeProject(projectName, targetDir, options, cfg),
    },
  ]);

  await tasks.run();

  console.log();
  console.log(
    `  🎉  Successfully created project ${chalk.yellow(targetDir)}.\n`
  );

  return true;
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

function resolveDependencies(options) {
  const schema = require("../models/deps.json");

  let deps = [];
  let devDeps = [];

  deps.push(...schema["backframe"]["deps"]);
  const features = Array.from(Object.keys(options));

  features.forEach((feat) => {
    if (typeof options[feat] === "string") {
      const value = options[feat];
      getDeps(schema, feat, value);
    } else {
      for (const value of Array.from(options[feat])) {
        getDeps(schema, feat, value);
      }
    }
  });

  function getDeps(schema, feat, value) {
    const obj = schema[feat][value];
    if (obj) {
      if (obj["deps"]) deps.push(...obj["deps"]);
      if (obj["devDeps"]) devDeps.push(...obj["devDeps"]);
    }
  }

  return [deps, devDeps];
}

async function initializeProject(name, dest, ctx, preset) {
  // Features entered manually
  const [deps, devDeps] = resolveDependencies(preset);

  const pkg = {
    name,
    version: "0.1.0",
    private: true,
    dependecies: {},
    devDependencies: {},
  };

  deps.forEach((dep) => {
    const version = dep.version || "latest";
    const name = dep.name;

    pkg.dependecies[name] = version;
  });

  devDeps.forEach((dep) => {
    const version = dep.version || "latest";
    const name = dep.name;

    pkg.devDependencies[name] = version;
  });
  // Write package.json
  writeFiles(dest, {
    "package.json": JSON.stringify(pkg, null, 2),
  });
}
