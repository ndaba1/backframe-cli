exports.getPromptModules = () => {
  return ["apis", "database", "authProviders", "bfInternals", "thirdParty"].map(
    (file) => require(`../prompts/${file}`)
  );
};
