import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FarmPage = (props) => {
    console.log(props.route)
    const farmInfo = props.route.params
    return (
        <View>
            <Text>Farm Page</Text>
            <Text>{farmInfo.farmName}, latitude:{farmInfo.latitude}, longitude: {farmInfo.longitude}</Text>
            
        </View>
    )
}

export default FarmPage;