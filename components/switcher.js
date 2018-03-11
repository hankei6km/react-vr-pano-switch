/*
 * Copyright (c) 2018 hankei6km
 * Licensed under the MIT License. See LICENSE.txt in the project root.
 */

import React from 'react';
import {
  Sphere,
  Text,
  VrButton,
  View,
  Animated,
} from 'react-vr';
import Easing from 'Easing';

export default class Switcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(0),
      floatValue: new Animated.ValueXY({x: -0.5, y: 0}),
    };
    this.curSpinValue = 0;
    // https://stackoverflow.com/questions/41932345/get-current-value-of-animated-value-react-native
    this.state.spinValue.addListener(({value})=>{
      this.curSpinValue = value;
    });
    this.enterSpin = false;
    this.startFloat = this.startFloat.bind(this);
    this.startSpin = this.startSpin.bind(this);
    this.repeatSpin = this.repeatSpin.bind(this);
    this.stopSpin = this.stopSpin.bind(this);
  }
  propTypes: {
    panoSource: PropTypes.string,
    rotateY: PropTypes.number,
    onSwitcherClick: PropTYpes.func,
  }
  componentDidMount() {
    this.startFloat();
  }
  getRandomFloatX() {
    return Math.random() * 0.05 - 0.025 - 0.5
  }
  getRandomFloatY() {
    return Math.random() * 0.1 - 0.05
  }
  startFloat() {
    Animated.timing(
      this.state.floatValue,
      {
        toValue: {x: this.getRandomFloatX(), y: this.getRandomFloatY()},
        duration: 2000,
      }
    ).start(this.startFloat);
  }
  startSpin() {
    if(!this.enterSpin){
      this.enterSpin = true;
      this.repeatSpin();
    }
  }
  repeatSpin() {
    if(this.enterSpin){
      Animated.timing(
        this.state.spinValue,
        {
          toValue: this.curSpinValue + 360,
          easing: Easing.linear,
        }
      ).start(this.repeatSpin);
    }
  }
  stopSpin(cb = ()=>{}) {
    if(this.enterSpin){
      this.enterSpin = false;
      this.state.spinValue.stopAnimation(()=>{
        // cb(); ここでやると動きがガクガクになる.
        Animated.timing(
          this.state.spinValue,
          {
            toValue: this.curSpinValue + 180,
            easing: Easing.in(Easing.linear),
            duration: 500,
          }
        ).start(()=>{
          this.curSpinValue = this.curSpinValue % 360;
          this.state.spinValue.setValue(this.curSpinValue);
          cb();
        });
      });
    }else{
      cb();
    }
  }
  render() {
    return (
      <Animated.View style={{
          // top: 0,
          // left: -0.5,
          ...this.state.floatValue.getLayout(),
          flex: 1,
          width: 1,
          height: 1,
          position: 'absolute',
          transform: [{rotateY: this.props.rotateY}, {translate:[0, -0.5, -3]}],
        }}
        >
        <VrButton onClick={()=>{
            this.stopSpin(() => {
              this.props.onSwitcherClick( this.props.panoSource)
            });
          }}>
          <Animated.View style={{
              transform: [{rotateY: this.state.spinValue}, {translate:[0, 0, 0]}],
            }}
            onEnter={this.startSpin}
            onExit={()=>{
              this.stopSpin();
            }}
            >
            <Sphere
              lit={true}
              widthSegments={16}
              heightSegments={16}
              texture={this.props.panoSource}
              style={{
                opacity: 0.9,
                top: 0,
                left: 0,
                width: 1,
                height: 1,
              }}
              />
          </Animated.View>
        </VrButton>
      </Animated.View>
    );
  }
};
