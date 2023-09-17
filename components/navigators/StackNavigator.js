import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash';
import Register from '../screens/Register';
import Login_SignIn from '../screens/Login_SignIn';
import BottomTabNavigator from './BottomTabNavigator';
import RegisterEmergencyContact from '../screens/RegisterEmergencyContact';
const Stack=createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={'splash'}>
             <Stack.Screen component={Splash} name='splash'></Stack.Screen>
             <Stack.Screen component={Register} name='register'></Stack.Screen>
             <Stack.Screen component={Login_SignIn} name='login_signin'></Stack.Screen>
             <Stack.Screen component={BottomTabNavigator} name='bottomtab'></Stack.Screen>
             <Stack.Screen component={RegisterEmergencyContact} name='emergency_contact_register'></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})