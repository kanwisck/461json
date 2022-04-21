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

import React, {useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import { Text, View, StyleSheet, Dimensions} from 'react-native';

const data = require('../farms.json');
//console.log(data);

const styles = StyleSheet.create({    
  map: {
      position: "absolute",
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      flex: 1,
  },
});

const FarmsMap = ({ navigation }) => {
const [farms, setFarms] = useState(data)
  
  return (
    <MapView
        style={styles.map}
        
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: 44.71,
          longitude: -122.96,
          latitudeDelta: 1.7,
          longitudeDelta: 1.7
        }}
        mapType="satellite">

        {Object.entries(farms).map(([key, farm]) => (
          <Marker
          key={key} // to make react happy
          coordinate={{latitude: farm.latitude, longitude: farm.longitude}}
          title={farm.name}
          pinColor="#360071">
            <Callout 
              tooltip={false}
              onPress={() => 
                navigation.navigate('FarmPage', {farmName: farm.name, longitude: farm.longitude, latitude: farm.latitude})
              }>
              <View style={{backgroundColor: "white", flex: 1, alignItems: "center"}}>
                <Text style={{color: 'black'}}>{farm.name}</Text>
                <Text></Text>
                <Text>tmin 28°C | tmax 97°C | prcp 40mm</Text>
                <Text style={{color: 'black'}}>Tap here to learn more</Text>
              </View>
            </Callout>
          </Marker>
        ))}

      </MapView>
  )
}

export default FarmsMap;
/*
export default
class FarmsMap extends React.Component {
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
*/