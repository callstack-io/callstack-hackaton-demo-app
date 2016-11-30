/* @flow */

import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';

type Props = {
  time: number;
};

type State = {
  ago: number;
};

export default class Ago extends Component<void, Props, State> {

  static propTypes = {
    time: PropTypes.number.isRequired,
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({ ago: Math.ceil((Date.now() - this.props.time) / 1000) });
    }, 1000);
  }

  componentWillUnmount() {
    clearinterval(this.intervalId);
  }

  state: State = {
    ago: 0,
  };

  render() {
    return (
      <Text>{this.state.ago} s</Text>
    ); 
  }
}
