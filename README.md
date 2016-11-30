Raspberry ip address: 192.168.1.47
Node-red http://192.168.1.47:1880

## HTTP API
- PING `GET http://192.168.1.47:1880/ping`
- LIGHT `GET http://192.168.1.47:1880/light`
- SONIC `GET http://192.168.1.47:1880/sonic`

## WS API
- `ws://192.168.1.47:1880/ws/sensors`
- Messages:
  - `
  {
    "sonic": {
      "status": number,
      "changeTime": timestamp
    }
  }`
  - `
  {
    "light": {
      "status": boolean,
      "changeTime": timestamp
    }
  }`

