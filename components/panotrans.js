/*
 * Copyright (c) 2018 hankei6km
 * Licensed under the MIT License. See LICENSE.txt in the project root.
 */

import React from 'react';
import {
  asset,
  Pano,
  View,
  Animated,
} from 'react-vr';
import Easing from 'Easing';

export default class PanoTrans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curSource: {},
      // curOpacity: 1,
      // curDisplay: 'flex',
      prevSource: {},
      prevOpacity: 1,
      prevDisplay: 'none',
    };
    this.transValue = new Animated.Value(0),
    this.transValue.addListener(({value})=>{
      this.setState({
        // curOpacity: value,
        prevOpacity: 1 - value,
      });
    });

  }
  propTypes: {
    source: PropTypes.object,
    transition: PropTypes.boolean,
  }
  componentWillMount() {
    this.setState({
      curSource: this.props.source,
      prevSource: this.props.source,
    });
  }
  componentWillReceiveProps(props) {
    if (this.props.source !== props.source) {
      this.startTrasit(props.source);
    }
  }
  startTrasit(nextSource) {
    if(this.props.transition){
      this.transValue.setValue(0);
      this.setState({
        curSource: nextSource,
        // curDisplay: 'none',
        prevDisplay: 'flex',
      })
      Animated.timing(
        this.transValue,
        {
          toValue: 1,
          duration: 1000,
        }
      ).start(()=>{
        this.setState({
          prevSource: this.props.source,
          // curDisplay: 'flex',
          prevDisplay: 'none',
        })
      });
    }else{
      this.setState({
        curSource: nextSource,
      });
    }
  }
  render() {
    return (
      <View>
        <Pano source={this.state.curSource} style={{
        }}/>
        <Pano source={this.state.prevSource} style={{
          opacity: this.state.prevOpacity,
          display: this.state.prevDisplay,
        }}/>
      </View>
      );
  }
}
