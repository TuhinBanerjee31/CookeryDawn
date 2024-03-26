/* eslint-disable prettier/prettier */
import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import Search from './screens/Search';
import Details from './screens/Details';
import Splash from './screens/Splash';
import Meal from './screens/Meal';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: '#25242A',
          }}
        />
        <Stack.Screen
          name="Meal"
          component={Meal}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: '#25242A',
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: '#FFFFFF',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
