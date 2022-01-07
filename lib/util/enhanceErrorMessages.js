import program from "commander";
import chalk from "chalk";

module.exports = (methodName, log) => {
  program.Command.prototype[methodName] = function (...args) {
    if (methodName === "unknownOption" && this._allowUnknownOption) {
      return;
    }
    this.outputHelp();
    console.log();
    console.log(`  ` + chalk.red(log(...args)));
    console.log();
    process.exit(1);
  };
};
