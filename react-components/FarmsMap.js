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

const data = require('../farmsNew.json');
//console.log(data);

//----------------------Styles----------------------
const styles = StyleSheet.create({
  map: {
      position: "absolute",
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      flex: 1,
  },
});



const FarmsMap = ({ navigation, search }) => {
  const [farms, setFarms] = useState(data)
  var searchedFarms = []
  const [climateData, setClimateData] = useState({
    "year":[0],
    "yday":[0],
    "prcp (mm/day)":[0],
    "tmax (deg c)":[0],
    "tmin (deg c)":[0]
  })

  //----------------------Search Functionality----------------------
  useEffect(() => {
    searchedFarms = [] // wipes previous searches from searchedFarms
    if (search != "") {
      farms.find((farm) => {
        // Look through all farm objects within farms
        if (Object.values(farm).toString().toLowerCase()
          .includes(search.toLowerCase())
          || Object.values(farm.farmData).toString().toLowerCase()
          .includes(search.toLowerCase())) {
            // If any of the values of that farm object contain the user's search
            // OR any of the farmData values have the user's search
          searchedFarms.push(farm) // add to searchedFarms
        }
      })
      setFarms(searchedFarms)
    } else {
      // search field was empty, display all data
      setFarms(data)
    }
  }, [search])

  /*
  //----------------------Bottom Action Sheet Stuff----------------------
  const [alterView, setAlterView] = React.useState(false)
  const toggleWindow = React.useCallback(
    () => setAlterView(!alterView),
    [alterView, setAlterView],
  )
  */

  //----------------------API Query----------------------
  const getCLimateData = async (lat, lon) => {
    try {
      const response = await fetch(`https://daymet.ornl.gov/single-pixel/api/data?lat=${lat}&lon=${lon}&vars=tmax,tmin,prcp&format=json`);
      const json = await response.json();
      setClimateData(json.data);
      return json.data;
    } catch (error) {
      console.error(error)
    }
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
          // Place a marker for all farm objects inside farms array
          <Marker
          key={key} // to make react happy
          coordinate={{latitude: farm.latitude, longitude: farm.longitude}}
          pinColor="#360071"
          onPress={
            () => {
              getCLimateData(farm.latitude, farm.longitude)
              //toggleWindow()
            }
          }
          >
          <Callout
              tooltip={false}
              onPress={() =>
                navigation.navigate('FarmPage', {farmName: farm.name, longitude: farm.longitude, latitude: farm.latitude,
                  years: climateData["year"], precipData: climateData["prcp (mm/day)"], tmaxData: climateData["tmax (deg c)"],
                  tminData: climateData["tmin (deg c)"]})
              }>
              <View style={{backgroundColor: "white", alignItems: "center"}}>
                <Text style={{color: 'black'}}>{farm.name}</Text>
                <Button
                  title="Click here to learn more"
                />
                {climateData["prcp (mm/day)"][0] != 0 ?
                <Text style={{color: 'lightblue'}}>
                  prcp: {climateData["prcp (mm/day)"][0].toFixed(2)}mm
                </Text> : null}
                {climateData["tmax (deg c)"][0] != 0 ?
                <Text style={{color: 'red'}}>
                  tmax: {climateData["tmax (deg c)"][0].toFixed(2)}{'\u00B0'}C
                </Text> : null}
                {climateData["tmin (deg c)"][0] != 0 ?
                <Text style={{ color: "blue", alignItems: "center"}}>
                  tmin: {climateData["tmin (deg c)"][0].toFixed(2)}{'\u00B0'}C{'\n'}
                </Text> : null}
                <Text>
                <Image
                        source={{ uri: 'https://oregonhazelnuts.org/wordpress/wp-content/uploads/2020/05/Chambers-Trees-1540x819.jpg' }}
                        style={{ width: 300, height: 200 }}
                    />
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}

      </MapView>

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
*/
export default FarmsMap;
