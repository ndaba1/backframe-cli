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
        name: "Sendgrid for emails",
        value: "sendgrid",
      },
      {
        name: "Twilio for messaging",
        value: "twilio",
      },
      {
        name: "Stripe for payment processing",
        value: "stripe",
      },
    ],
    message: "Select any third party APIs to integrate",
  };

  return prompt;
};
