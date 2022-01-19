module.exports = () => {
  const CIPrompt = {
    name: "devops",
    type: "list",
    message: "Would you like to setup a CI/CD workflow?",
    choices: [
      { name: "Yes, setup with Github Actions", value: "gha" },
      { name: "Yes, setup with Travis CI", value: "travis" },
      { name: "No, proceed without one", value: "none" },
    ],
  };

  const FirebasePrompt = {
    name: "firebase",
    type: "confirm",
    message: "Would you like to connect your project with Firebase",
    when: (answers) => answers.database !== "firestore",
  };

  const PresetPrompt = {
    name: "SavePreset",
    type: "confirm",
    message: "Would you like to save current configuration as a preset?",
  };

  return [CIPrompt, FirebasePrompt, PresetPrompt];
};
