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

 import { VictoryBar, VictoryChart, VictoryTheme, VictoryArea, VictoryAxis, VictoryLine } from "victory-native";

 // --------------------------------------------------------------------------------------------------------
 const temperatureData = [
   { year: "2005", temp: 11, temp0: 8},
   { year: "2006", temp: 13, temp0: 11},
   { year: "2007", temp: 12, temp0: 7},
   { year: "2008", temp: 12, temp0: 8},
   { year: "2009", temp: 14, temp0: 12},
   { year: "2010", temp: 13, temp0: 10}
 ];

 const TempGraph = ({years, data_min, data_max}) => {
   var unique_years = [...new Set(years)];
   var temp_min_obj = [];
   var temp_max_obj = [];
   var min_averages = [];
   var max_averages = [];

   for(var i = 0; i < data_min.length; i++) {
     const min_data = (1.8 * data_min[i]) + 32
     const max_data = (1.8 * data_max[i]) + 32
     temp_min_obj.push({x: years[i], y: min_data});
     temp_max_obj.push({x: years[i], y: max_data});
   }

   for(var i = 0; i < unique_years.length; i++) {
     var temp_min_by_year = temp_min_obj.filter(res => res.x.toString().includes(unique_years[i].toString()));
     const temp_min_average = temp_min_by_year.reduce((total, next) => total + next.y, 0) / temp_min_by_year.length;
     min_averages.push({x: unique_years[i], y: temp_min_average});

     var temp_max_by_year = temp_max_obj.filter(res => res.x.toString().includes(unique_years[i].toString()));
     const temp_max_average = temp_max_by_year.reduce((total, next) => total + next.y, 0) / temp_max_by_year.length;
     max_averages.push({x: unique_years[i], y: temp_max_average})
   }

   return (
     <View style={graphStyles.container}>
       <VictoryChart maxDomain={{ y: 100 }}>
         <VictoryLine
        style={{
          data: { stroke: "blue" },
          parent: { border: "1px solid #ccc"}
        }}
        data={min_averages}
        />
        <VictoryLine
       style={{
         data: { stroke: "#e4211c" },
         parent: { border: "1px solid #ccc"}
       }}
       data={max_averages}
       />
       <VictoryAxis dependentAxis />
       <VictoryAxis tickFormat={(t) => `${t}`}/>
       </VictoryChart>
     </View>
   );
 }

 const PrecipGraph = ({years, data}) => {
   var unique_years = [...new Set(years)];
   var data_obj = [];
   var averages = [];
   var precipData = []

   for(var i = 0; i < data.length; i++) {
     data_obj.push({x: years[i], y: data[i], y0: 0});
   }

   for(var i = 0; i < unique_years.length; i++) {
     var data_by_year = data_obj.filter(res => res.x.toString().includes(unique_years[i].toString()));
     const average = data_by_year.reduce((total, next) => total + next.y, 0) / data_by_year.length;
     precipData.push({x: unique_years[i], y: average, y0: 0});
   }

   return (
     <View style={graphStyles.container}>
       <VictoryChart maxDomain={{ y: 15 }}>
        <VictoryBar width={350} style={{data: {fill: "#66ccff"}}} data={precipData} />
        <VictoryAxis dependentAxis />
        <VictoryAxis tickFormat={(t) => `${t}`}/>
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
 const Graphs = ({years, precipData, tmaxData, tminData}) => {
   return (
       <ScrollView contentInsetAdjustmentBehavior="automatic">
           <View>
             <Text style={styles.titleText}>Temperature (°F)</Text>
             <TempGraph years={years} data_min={tminData} data_max={tmaxData}/>
             <Text style={styles.titleText}>Precipitation (Inches)</Text>
             <PrecipGraph years={years} data={precipData}/>
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
