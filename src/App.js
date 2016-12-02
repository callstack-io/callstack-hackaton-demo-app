/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
} from 'react-native';
import Beacons from 'react-native-ibeacon';

import Ago from './Ago';

type Light = {
  status: boolean;
  changeTime: number;
};

type SonicStatus = {
  status: number;
  changeTime: number;
};

type State = {
  connecting: boolean;
  connected: boolean;
  light: ?LightStatus;
  sonic: ?SonicStatus;
};

export default class App extends Component<void, void, State> {

  state: State = {
    connecting: false,
    connected: false,
    light: null,
    sonic: null,
  };

  componentDidMount() {
    Promise.all([
      fetch('http://192.168.1.47:1880/light').then((res) => res.json()),
      fetch('http://192.168.1.47:1880/sonic').then((res) => res.json()),
    ]).then(([light, sonic]: [LightStatus, SonicStatus]) => {
      this.setState({ light, sonic });
    }).then(this._connectedToWs);

    const  region = {
      identifier: 'Callstack',
      uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e'
    };


    // Request for authorization while the app is open
    Beacons.requestWhenInUseAuthorization();

    Beacons.startMonitoringForRegion(region);
    Beacons.startRangingBeaconsInRegion(region);

    Beacons.startUpdatingLocation();

    // Listen for beacon changes
    const subscription = DeviceEventEmitter.addListener(
    'beaconsDidRange',
    (data) => {
      console.log(data);
      // data.region - The current region
      // data.region.identifier
      // data.region.uuid

      // data.beacons - Array of all beacons inside a region
      //  in the following structure:
      //    .uuid
      //    .major - The major version of a beacon
      //    .minor - The minor version of a beacon
      //    .rssi - Signal strength: RSSI value (between -100 and 0)
      //    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
      //    .accuracy - The accuracy of a beacon
    }
    );
  }

  componentWillUnmount() {
    if (this.ws) {
      this.ws.close();
    }
  }

  _connectedToWs = () => {
    this.setState({ connecting: true });

    const ws = new WebSocket('ws://192.168.1.47:1880/ws/sensors');
    ws.onopen = () => this.setState({ connecting: false, connected: true });
    ws.onmessage = (event) => this.setState((JSON.parse(event.data)));
    ws.onclose = () => this.setState({ connected: false });

    this.ws = ws;
  }

  _renderLightInfo() {
    if (!this.state.light) {
      return null;
    }
    return (
      <Text>Light is {this.state.light.status ? 'ON' : 'OFF'} since <Ago time={this.state.light.changeTime}/>
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        {this.state.connecting && <Text>WS connecting</Text>}
        <Text>{this.state.connected ? 'WS connected' : 'WS not connected'}</Text>
        {this._renderLightInfo()}
        {this.state.sonic && <Text>Sonic distance = {this.state.sonic.status}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

