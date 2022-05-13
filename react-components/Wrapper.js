import React, {useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import FarmsMap from "./FarmsMap";
import { SearchBar } from '@rneui/themed';

const Wrapper = ({ navigation }) => {
    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
        setSearch(search);
    };
    
    return (
        <View>
            <FarmsMap navigation={navigation} search={search} />
            <SearchBar 
                style={styles.view}
                placeholder="Search farms, crops, etc..."
                onChangeText={updateSearch}
                value={search} 
                searchIcon = {{name: "magnifying-glass", type: 'foundation'}}
                />
        </View>
        
    )
}

const styles = StyleSheet.create({
    view: {
      backgroundColor: "white",
    },
    });

export default Wrapper;