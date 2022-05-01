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
import { Text, Image, Button, View, StyleSheet, Dimensions} from 'react-native';

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
  const [climateData, setClimateData] = useState({
    year:[0]
  })
  
  const getCLimateData = async (lat, lon) => {
    try {
      const response = await fetch(`https://daymet.ornl.gov/single-pixel/api/data?lat=${lat}&lon=${lon}&vars=tmax,tmin,prcp&format=json`);
      const json = await response.json();
      setClimateData(json.data);
      console.log("within getClimateData json.data.year:" ,json.data.year[0]);
      return json.data;
    } catch (error) {
      console.error(error)
    }
    /*
    return (await fetch(`https://daymet.ornl.gov/single-pixel/api/data?lat=${lat}&lon=${lon}&vars=tmax,tmin,prcp&format=json`)
      .then((response) => response.json())
      .then((json) => {
        //console.log(json.data.year)
        setClimateData(json.data)
        return json.data
      })
      .catch((error) => {
        console.error(error)
      })
    );
    */
  }

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
          pinColor="#360071"
          onPress={
            () => {
              console.log("within marker onPress before query", climateData)
              getCLimateData(farm.latitude, farm.longitude)
              .then(console.log("within marker onPress after query", climateData))
            }
          }
          >
            <Callout 
              tooltip={false}
              onPress={() => 
                navigation.navigate('FarmPage', {farmName: farm.name, longitude: farm.longitude, latitude: farm.latitude})
              }>
              <View style={{backgroundColor: "white", flex: 1, alignItems: "center"}}>
                <Text style={{color: 'black'}}>{farm.name}</Text>
                <Text></Text>
                <Text>{}</Text>
                <Text>
                    <Image
                        source={{ uri: 'https://oregonhazelnuts.org/wordpress/wp-content/uploads/2020/05/Chambers-Trees-1540x819.jpg' }}
                        style={{ width: 300, height: 200 }}
                    />
                </Text>
                <Button
                  title="Click here to learn more"
                />
              </View>
            </Callout>
          </Marker>
        ))}

      </MapView>
  )
}

export default FarmsMap;