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
import RNBottomActionSheet from 'react-native-bottom-action-sheet';

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
    "prcp (mm/day)":[0]
  })
  const [alterView, setAlterView] = React.useState(false)
  
  const toggleWindow = React.useCallback(
    () => setAlterView(!alterView),
    [alterView, setAlterView],
  )
  const getCLimateData = async (lat, lon) => {
    try {
      const response = await fetch(`https://daymet.ornl.gov/single-pixel/api/data?lat=${lat}&lon=${lon}&vars=tmax,tmin,prcp&format=json`);
      const json = await response.json();
      setClimateData(json.data);
      //console.log("within getClimateData json.data.year:" ,json.data.year[0]);
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
    <>
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
          pinColor="#360071"
          onPress={
            () => {
              //console.log("within marker onPress before query", climateData)
              getCLimateData(farm.latitude, farm.longitude)
              console.log("within marker onPress after query", climateData["prcp (mm/day)"][0])
              console.log("before alterView", alterView)
              toggleWindow()
              console.log("after alterView", alterView)
            }
          }
          > 
          
          </Marker>
        ))}

      </MapView>
      <RNBottomActionSheet.AlertView
            visible={alterView}
            title={"Awesome!"}
            message={"What can we improve? Your feedback is always welcome."}
            positiveText={"OK"}
            positiveBackgroundColor={"#eeffee"}
            positiveTextColor={"#006500"}
            negativeText={"Exit"}
            negativeBackgroundColor={"#ffebeb"}
            negativeTextColor={"#760000"}
            theme={"light"}
            onPositive={() => {
              console.log("positive clicked");
              console.log("before pos", alterView)
              toggleWindow()
              console.log("after pos", alterView)
            }}
            onNegative={() => {
              console.log("negative clicked");
              console.log("before negative", alterView)
              toggleWindow()
              console.log("after negative", alterView)
            }} />
      </>
  )
}


/*
  <Callout 
              tooltip={false}
              onPress={() => 
                navigation.navigate('FarmPage', {farmName: farm.name, longitude: farm.longitude, latitude: farm.latitude})
              }>
              <View style={{backgroundColor: "white", flex: 1, alignItems: "center"}}>
                <Text style={{color: 'black'}}>{farm.name}</Text>
                <Text></Text>
                {climateData.year[0] != 0 ? <Text>{climateData.year[0]}</Text> : null}
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
*/
export default FarmsMap;