import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Graphs from "./Graphs";
const FarmPage = (props) => {
    const farmInfo = props.route.params
    return (
        <View style={{backgroundColor: "white", flex: 1, alignItems: "center"}}>
            <Text>Farm Page</Text>
            <Text>{farmInfo.farmName}</Text>
            <Text>latitude:{farmInfo.latitude.toFixed(3)}</Text>
            <Text>longitude: {farmInfo.longitude.toFixed(3)}</Text>
            <Graphs years={farmInfo.years} precipData={farmInfo.precipData} tminData={farmInfo.tminData} tmaxData={farmInfo.tmaxData}/>
        </View>
    )
}

export default FarmPage;
