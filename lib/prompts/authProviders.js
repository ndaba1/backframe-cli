// TODO: Implement Functionality for auth providers
/**
 * Allow Github signin/up
 * Allow google
 * Allow facebook
 * Continue with twitter etc
 */
module.exports = () => {
  const providers = [
    "Google",
    "Facebook",
    "Twitter",
    "Github",
    "Email and password",
    "Phone Number",
  ];

  const prompt = {
    name: "AuthProviders",
    type: "checkbox",
    message: "Select which auth providers you would to incorporate:",
    choices: [...providers],
    default: "Email and password",
  };

  return prompt;
};
