const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://localhost:1883", {
  clientId: "retained-test-subscribe",
  resubscribe: false,
  clean: false,
});

client.on("connect", () => {
  console.log("Connected!");

  client.subscribe("retain-test", { qos: 2 }, function (err) {
    if (!err) {
      console.log("Subscribed!");
    } else {
      console.error(err);
    }
  });
});

client.on("disconnect", () => {
  console.log("Disconnected!");
});

client.on("error", (error) => {
  console.error(error);
});

client.on("message", function (topic, message) {
  console.log("Message received on " + topic + ": " + message.toString());
});
