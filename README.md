### Setup

- Setup minikube or use an existing k8s cluster.
- `helm repo add vernemq https://vernemq.github.io/docker-vernemq`
- `helm install vernemq vernemq/vernemq -f values.yaml`
- `kubectl port-forward service/vernemq 1883:1883`

### Test

- Subscribe with two clients and let one publish a retained message.
  > The `scripts` folder contains two [https://github.com/mqttjs/MQTT.js](MQTT.js) scripts for publishing and subscribing a sample message. See the README if you want to use them.
- `kubectl rollout restart statefulset vernemq` (Simulates a rolling release or a kubernetes upgrade)
- Wait until both pods have restarted and do the above again.
  > The pods can be checked with `kubectl get pods | grep "vernemq"`
- Check with `kubectl exec vernemq-0 -- /vernemq/bin/vmq-admin retain show`
  > Or run the subscribe script from the `scripts` folder again.
