import { StyleSheet, Text, View, ImageBackground, PermissionsAndroid } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import auth, { firebase } from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setisLogged] = useState(false);
  useEffect(() => {
    // auth().signOut();
    const user = auth().currentUser;
    if (user) {
      checkLocalStorage();
    } else {
      navigation.replace("login_signin");
    }
    const unsuscribe = auth().onAuthStateChanged((user) => {
      getPermissions();
      if (user) {
        setUser(user);
        navigation.replace("bottomtab");
      } else {
        setUser(null);
        navigation.replace("login_signin");
      }
    })

  }, []);
  checkLocalStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('emergencyContact');
      if (jsonValue == null) {
        console.log("this is called");
        navigation.replace('emergency_contact_register');
      } else {
        navigation.replace('login_signin');
      }
    } catch (e) {

    }

  }
  const getPermissions = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS, {

    },
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {}
    );
  }
  useEffect(() => {
    getEmergencyContact();
  
    return () => {
      
    }
  }, []);
  getEmergencyContact=async()=>{
    try {
      var jsonValue=await AsyncStorage.getItem('emergencyContact');
      if(jsonValue==null){
        setisLogged(false);
      }else{
        setisLogged(true);
      }
    } catch (error) {
      
    }
  }
  
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1, }} resizeMode='cover' source={require('./../assets/gradient.jpg')}></ImageBackground>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})