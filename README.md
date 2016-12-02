Raspberry ip address: 192.168.1.47

Node-red http://192.168.1.47:1880

![App screenshoot](/Screenshot_20161130-143926.png?raw=true)

## BEACONS
Region:
`const region = {
    identifier: 'Callstack',
    uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e'
};`

Beacon IDs:
`const majorIDs = [38488, 32301]`

## HTTP API
- PING 
  - Request `GET http://192.168.1.47:1880/ping`
  - Response `
    {
      "pong": true
    }`
- LIGHT 
  - Request `GET http://192.168.1.47:1880/light`
  - Response `
    {
      "status": false,
      "changeTime": 1480512508710
    }`
- SONIC 
  - Request `GET http://192.168.1.47:1880/sonic`
  - Response `
    {
      "status": 425,
      "changeTime": 1480512848995
    }`

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

