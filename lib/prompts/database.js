// TODO: Implement functionality for the database
/**
 * 1. Elasticsearch
 * 2. Redis
 * 3. MongoDB
 * 4. My SQL
 * 5. Microsoft SQL server
 * 6. Maria DB
 * 7. Cloud Firestore [If selected, Firebase compatibility by default]
 * 8. Apache Cassandra
 * 9. Cockroach DB
 * 10. Couch DB
 */

module.exports = () => {
  const values = [
    {
      name: "Cloud Firestore - If you select Firestore, firebase compatibility will be enabled by default",
      message:
        "If you select Firestore, firebase compatibility will be enabled by default",
      value: "firestore",
    },
    {
      name: "Elasticsearch",
      value: "elasticsearch",
    },
    {
      name: "Redis",
      value: "redis",
    },
    {
      name: "MongoDB",
      value: "mongodb",
    },
    {
      name: "MariaDB",
      value: "mariadb",
    },
    {
      name: "My SQL",
      value: "mysql",
    },
    {
      name: "PostgresQL",
      value: "postgres",
    },
  ];

  const prompt = {
    type: "list",
    name: "database",
    message: "Select a database:",
    choices: [...values],
    default: "mongodb",
  };

  return prompt;
};
