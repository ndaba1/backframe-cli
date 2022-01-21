// TODO: Implement integration with third party apis
/**
 * Sendgrid
 * Twilio
 * Stripe
 * ETC.
 */
module.exports = () => {
  const prompt = {
    name: "third-party",
    type: "checkbox",
    choices: [
      {
        name: "Firebase - Enabled by default if you choose Cloud Firestore",
        value: "firebase",
        checked: (answers) => answers.database === "firestore",
        // disabled: (answers) => answers.database === "firestore",
      },
      {
        name: "Sendgrid for emails",
        value: "sendgrid",
      },
      {
        name: "Stripe for payment processing",
        value: "stripe",
      },
      {
        name: "Twilio for messaging",
        value: "twilio",
      },
    ],
    message: "Select any third party APIs/Platforms to integrate with:",
  };

  return prompt;
};
