import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home';
import TextToSpeech from '../screens/Recog';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faContactBook, faHome } from '@fortawesome/free-solid-svg-icons';
import Notifications from '../screens/Notifications';
import EmergencyContacts from '../screens/EmergencyContacts';
const Tab=createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
        
        <Tab.Screen name='home' component={Home} options={{tabBarIcon:({color,size})=>(<FontAwesomeIcon icon={faBell} color={color}></FontAwesomeIcon>)}}></Tab.Screen>
        
        <Tab.Screen name='notifications' component={Notifications} options={{tabBarIcon:({color,size})=>(<FontAwesomeIcon icon={faBell} color={color}></FontAwesomeIcon>)}}></Tab.Screen>

        <Tab.Screen name='emergency_contacts' component={EmergencyContacts} options={{tabBarIcon:({color,size})=>(<FontAwesomeIcon icon={faContactBook} color={color}></FontAwesomeIcon>)}}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default BottomTabNavigator

const styles = StyleSheet.create({})