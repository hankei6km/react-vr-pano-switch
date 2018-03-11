/*
 * Copyright (c) 2018 hankei6km
 * Licensed under the MIT License. See LICENSE.txt in the project root.
 */

import React from 'react';
import {
  AppRegistry,
  asset,
  AmbientLight,
  PointLight,
  Pano,
  Text,
  View,
} from 'react-vr';
import PanoTrans from './components/panotrans.js'
import Switcher from './components/switcher.js'

const panoTbl = [
  {
    panoSource: asset('panos/pano01.jpg'),
    rotateY: 60,
  }, {
    panoSource: asset('panos/pano02.jpg'),
    rotateY: 20,
  }, {
    panoSource: asset('panos/pano03.jpg'),
    rotateY: -20,
  }, {
    panoSource: asset('panos/pano04.jpg'),
    rotateY: -60,
  },
];

export default class ReactVrPanoSwitch extends React.Component {
  constructor() {
    super();
    this.state = {
      panoSource: panoTbl[0].panoSource,
    };
    this.setPano = this.setPano.bind(this)
  }
  setPano(panoSource) {
    this.setState({
      panoSource: panoSource,
    })
  }
  render() {
    panos = panoTbl.map((p, i)=>
      (<Switcher key={i} panoSource={p.panoSource} rotateY={p.rotateY}
        onSwitcherClick={this.setPano}/>)
    );
    return (
      <View>
        <PointLight intensity={1.0} style={{
          transform: [{ translate: [0, 10, 10] }]
        }}/>
        <AmbientLight intensity={0.5} />
        <PanoTrans transition={false} source={this.state.panoSource}/>
        {panos}
      </View>
    );
  }
};

AppRegistry.registerComponent('ReactVrPanoSwitch', () => ReactVrPanoSwitch);
