// TODO: Implement integration with third party apis
/**
 * Sendgrid
 * Twilio
 * Stripe
 * ETC.
 */
module.exports = () => {
  const prompt = {
    name: "ThirdPartyAPIs",
    type: "checkbox",
    choices: [
      {
        name: "Sendgrid for emails",
        value: "sendgrid",
      },
      {
        name: "Twilio",
        value: "twilio",
      },
      {
        name: "Stripe",
        value: "stripe",
      },
    ],
    message: "Select any third party APIs to integrate",
  };

  return prompt;
};
