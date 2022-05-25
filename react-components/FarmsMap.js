/**
 * FarmsMap Component
 * Main screen of the application
 * 
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

/** Farm Data
 * Currently stored in a json file in the root directory
 * Could be converted into a database and queried from via an API
 * Hess' Cloud Dev course (CS493) will teach you much of this
 * 
 * This will become outdated each year as more farms are awarded
 * the Century Farm title. Download the latest version of the .csv at
 * http://ocfrp.library.oregonstate.edu/public/farms
 * and run generateFarmJSON.py when this happens
 * (or use a more elegant, automated way)
 */
const data = require('../farmsNew.json');

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
  // 30 year averages for info window
  const [prcpAvg, setPrcpAvg] = useState(0)
  const [tempMaxAvg, setTempMaxAvg] = useState(0)
  const [tempMinAvg, setTempMinAvg] = useState(0)
  // 30 year average function
  const avg = (array) => array.reduce((a, b) => a + b) / array.length

  //----------------------Search Functionality----------------------
  useEffect(() => {
    searchedFarms = [] // wipes previous searches from searchedFarms
    if (search != "") {
      farms.find((farm) => {
        // Look through all farm objects within farms
        // If any of the values of that farm object contain the user's EXACT search
        if (Object.values(farm).toString().toLowerCase()
          .includes(search.toLowerCase())
          // OR any of the farmData values have the user's EXACT search
          || Object.values(farm.farmData).toString().toLowerCase()
          .includes(search.toLowerCase())) {
          searchedFarms.push(farm) // add to searchedFarms
          // Exact is emphasized because it will look for a perfect substring
          // so searching for apples; barley will show different farms
          // than typing barley; apples
          // hosting this info on a db  and querying will make searching this much easier
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
  /**
   * Requests data from daymet API 
   * obtains climate data from 1980 to most recent year available (up to 2021 as of May, 2022)
   * Documentation: https://daymet.ornl.gov/web_services
   * Specifically, we are querying Single Pixel Data. Not their Gridded Subsets
   */
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
              if (climateData["tmax (deg c)"][0]!= 0) {
                // If we have actual queried data, not defaults
                const arrayLength = climateData["tmax (deg c)"].length
                setPrcpAvg(avg(climateData["prcp (mm/day)"].slice(arrayLength - (365*30))))
                setTempMaxAvg(avg(climateData["tmax (deg c)"].slice(arrayLength - (365*30))))
                setTempMinAvg(avg(climateData["tmin (deg c)"].slice(arrayLength - (365*30))))
                // Get prcp 30 year average
              }
              
              //toggleWindow()
            }
          }
          >
          <Callout
              tooltip={false}
              onPress={() =>
                navigation.navigate('FarmPage', {farmName: farm.name, longitude: farm.longitude, latitude: farm.latitude,
                  years: climateData["year"], 
                  precipData: climateData["prcp (mm/day)"], 
                  tmaxData: climateData["tmax (deg c)"],
                  tminData: climateData["tmin (deg c)"]}
                  )
              }>
              <View style={{backgroundColor: "white", alignItems: "center"}}>
                <Text style={{color: 'black'}}>{farm.name}</Text>
                <Button
                  title="Tap to learn more"
                />
                {prcpAvg != 0 ?
                <Text style={{color: '#66ccff'}}>
                  prcp: {prcpAvg.toFixed(2)}mm
                </Text> : null}
                {tempMaxAvg != 0 ?
                <Text style={{color: 'red'}}>
                  tmax: {tempMaxAvg.toFixed(2)}{'\u00B0'}C
                </Text> : null}
                {tempMinAvg != 0 ?
                <Text style={{ color: 'blue', alignItems: "center"}}>
                  tmin: {tempMinAvg.toFixed(2)}{'\u00B0'}C{'\n'}
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
