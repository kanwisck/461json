import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Graphs from "./Graphs";
const FarmPage = (props) => {
    console.log(props.route)
    const farmInfo = props.route.params
    return (
        <View style={{backgroundColor: "white", flex: 1, alignItems: "center"}}>
            <Text>Farm Page</Text>
            <Text>{farmInfo.farmName}</Text>
            <Text>latitude:{farmInfo.latitude}</Text>
            <Text>longitude: {farmInfo.longitude}</Text>
            <Graphs />
        </View>
    )
}

export default FarmPage;