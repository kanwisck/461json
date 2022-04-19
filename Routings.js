import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FarmsMap from "./FarmsMap";
import FarmPage from "./FarmPage";

const Stack = createNativeStackNavigator();

const Routings = () => (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="FarmsMap"
          component={FarmsMap}
          options={{ title: 'Century Farms App' }}
        />
        <Stack.Screen name="FarmPage" component={FarmPage} />
      </Stack.Navigator>
    </NavigationContainer>
)

export default Routings;