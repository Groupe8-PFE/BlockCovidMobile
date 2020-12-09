import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './LandingScreen';
import HomeScreen from './HomeScreen';

const RootStack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
          <RootStack.Navigator>
            
            <RootStack.Screen name="Landing" component={LandingScreen} />
            <RootStack.Screen name="Home" component={HomeScreen} />
            
          </RootStack.Navigator>
        </NavigationContainer>
      );
}


export default App;
