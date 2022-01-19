// TODO:
/**
 * To include all the api options
 * 1. GraphQL
 * 2. REST
 * 3. RPC
 * 4. SOAP?
 *
 * Multiple apis are supported
 */
module.exports = () => {
  const prompt = {
    type: "checkbox",
    name: "APIs",
    message: "What API(s) would you like to implement?",
    choices: ["GraphQL", "REST", "RPC", "SOAP"],
    default: "REST",
  };

  return prompt;
};
