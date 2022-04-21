/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
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
 
 // --------------------------------------------------------------------------------------------------------
 const temperatureData = [
   { year: "2005", temp: 11, temp0: 8},
   { year: "2006", temp: 13, temp0: 11},
   { year: "2007", temp: 12, temp0: 7},
   { year: "2008", temp: 12, temp0: 8},
   { year: "2009", temp: 14, temp0: 12},
   { year: "2010", temp: 13, temp0: 10}
 ];
 
 const precipData = [
   { x: "2001", y: 1093, y0: 0},
   { x: "2002", y: 1063, y0: 0},
   { x: "2003", y: 1200, y0: 0},
   { x: "2004", y: 1046, y0: 0},
   { x: "2005", y: 905, y0: 0},
   { x: "2006", y: 990, y0: 0},
   { x: "2007", y: 1085, y0: 0}
 ];
 
 const TempGraph = () => {
   return (
     <View style={graphStyles.container}>
       <VictoryChart width={350} theme={VictoryTheme.material} maxDomain={{ y: 15 }} minDomain={{ y: 0 }}>
       <VictoryBar style={{data: {fill: "#ff3300"}}} data={temperatureData} x="year" y="temp" y0="temp0" />
       <VictoryAxis orientation='bottom'/>
       <VictoryAxis dependentAxis orientation='left' />
       </VictoryChart>
     </View>
   );
 }
 
 const PrecipGraph = () => {
   return (
     <View style={graphStyles.container}>
       <VictoryChart maxDomain={{ y: 1500 }}>
       <VictoryArea width={350} style={{data: {fill: "#66ccff"}}} data={precipData} />
       </VictoryChart>
     </View>
   );
 }
 
 const graphStyles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: "#f5fcff",
   }
 });
 
 // --------------------------------------------------------------------------------------------------------
 const Graphs = () => {
   return (
       <ScrollView contentInsetAdjustmentBehavior="automatic">
           <View>
             <Text style={styles.titleText}>Temperature (°C)</Text>
             <Text style={styles.allText}>2005-2010</Text>
             <TempGraph/>
             <Text style={styles.titleText}>Precipitation (Millimetres)</Text>
             <Text style={styles.allText}>2005-2010</Text>
             <PrecipGraph />
           </View>
       </ScrollView>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
   allText: {
     textAlign: 'center',
     backgroundColor: '#f5fcff',
   },
   titleText: {
     textAlign: 'center',
     fontSize: 26,
     backgroundColor: '#f5fcff',
   }
 });
 
 export default Graphs;