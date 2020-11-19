const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://localhost:1883", {
  clientId: "retained-test-publish",
  resubscribe: false,
  clean: false,
});

client.on("connect", () => {
  console.log("Connected!");

  client.publish("retain-test", "test", { qos: 2, retain: true }, () => {
    console.log("Published!");

    client.end(() => {
      process.exit(0);
    });
  });
});

client.on("disconnect", () => {
  console.log("Disconnected!");
});

client.on("error", (error) => {
  console.error(error);
});
