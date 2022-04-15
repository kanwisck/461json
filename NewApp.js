/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/*---------Todo---------
 1. Look into info window for google maps
 2. use Map to loop through react markers and polygons

*/

import React from 'react';
import type {Node} from 'react';
import MapView, { PROVIDER_GOOGLE, Polyline, Polygon, Marker, Callout} from 'react-native-maps';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { VictoryBar, VictoryChart, VictoryTheme, VictoryArea, VictoryAxis } from "victory-native";

const data = require('./farms.json');
//console.log(data);

export default
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      initRegion: {
      latitude: 44.65,
      longitude: -123.03,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421},
      farms: data
    }
    //console.log("===farms.json: ",data)
  }
  
  render() {
    return (    
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={this.state.initRegion}
        mapType="satellite">

        {Object.entries(this.state.farms).map(([key, farm]) => (
          <Marker
          key={key} // to make react happy
          coordinate={{latitude: farm.latitude, longitude: farm.longitude}}
          title={farm.name}
          pinColor="#360071" >
            <Callout tooltip={true}>
              <View style={{backgroundColor: "white", flex: 0.5, alignItems: "center"}}>
                <Text style={{color: 'black'}}>{farm.name}</Text>
                <Text></Text>
                <Text>tmin 28°C | tmax 97°C | prcp 40mm</Text>
                <Text>Click here to learn more</Text>
              </View>
            </Callout>
          </Marker>
        ))}

      </MapView>
    );
  }
}
