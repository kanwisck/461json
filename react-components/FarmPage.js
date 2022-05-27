import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import Graphs from "./Graphs";

/**
 * Profile Preset provided by bootday.com
 * https://www.bootdey.com/react-native-snippet/16/profile-detail
 */

const FarmPage = (props) => {
    const farm = props.route.params
    var historicalData = []
    var currentData = []
    // Generate an array of strings to be mapped
    // Separates current and historical data included in century farm application
    for (const [key, value] of Object.entries(farm.farmData)) {
        if (value && key != "" && value != "") {
            switch(key) {
                case "Crops or livestock historically raised on property":
                    historicalData.push(`${key}: ${value}`)
                    break;
                case "Ethnic origin of original owners":
                    historicalData.push(`${key}: ${value}`)
                    break;
                case "Origin of original owners":
                    historicalData.push(`${key}: ${value}`)
                    break;
                case "Original Acreage":
                    historicalData.push(`${key}: ${value}`)
                    break;
                case "Original Owner":
                    historicalData.push(`${key}: ${value}`)
                    break;
                case "Please describe attachments":
                    // Describes attatchments of pdf that can be downloaded
                    // separately on the OCFRP website. We don't use these at the moment,
                    // but they could be downloaded and displayed here later
                    break;
                case "Please explain":
                    // more pdf info we don't want to display right now
                    break;
                case "Year of Property Acquisition":
                    historicalData.push(`${key}: ${value}`)
                    break;   
                case "Application on file":
                    break;    
                case "Genealogical information included":
                    break;
                case "Other":
                    break;
                default:
                    currentData.push(`${key}: ${value}`)
            }
        }
      }
    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={[styles.card, styles.profileCard]}> 
                <Text style={styles.farmName}>{farm.farmName}</Text>
                <Text style={styles.subTitle}>Est.{farm.farmData["Year of Property Acquisition"]}</Text>
            </View> 

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Current Data</Text> 
                {currentData.map((info) => (
                    <Text style={styles.bodyText}>{info}</Text>
                ))}  
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Historical Data</Text>   
                {historicalData.map((info) => (
                    <Text style={styles.bodyText}>{info}</Text>
                ))}    
            </View>

            <View style={styles.graphsCard}>
                <Text style={styles.cardTitle}>Graphs</Text>   
                <View style={styles.graphsContainer}>
                    <Graphs years={farm.years} precipData={farm.precipData} tminData={farm.tminData} tmaxData={farm.tmaxData}/>
                </View>
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    backgroundColor : "#DCDCDC"
  },
  cardTitle:{
    color:"#000",
    fontSize:22,
    marginBottom:5,
  },
  subTitle: {
    color:"#808080",
    fontSize:14,
    marginBottom:1
  },
  avatar:{
    width:150,
    height:150,
  },
  card:{
    backgroundColor: "#FFFFFF",
    borderRadius:10,
    padding:10,
    marginTop:10,
  },
  profileCard:{
    alignItems: 'center',
    marginTop:5,
  },
  farmName:{
    fontSize:22,
    color:"#000",
  },
  graphsContainer:{
    height: 'auto',
  },
  graphsCard:{
    marginTop:10,
  },
  photo:{
    width:113,
    height:113,
    marginTop:5,
    marginRight:5,
  },
  bodyText:{
    color:"#808080",
    margin:5
  }
});

export default FarmPage;