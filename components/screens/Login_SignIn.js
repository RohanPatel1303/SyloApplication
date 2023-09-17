import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableOpacity, NativeModules, PermissionsAndroid } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import auth, { firebase } from '@react-native-firebase/auth'
import { GoogleSigninButton, GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
var DirectSms = NativeModules.DirectSms;


const Login_SignIn = ({ navigation }) => {



  googleSignIn = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS, {

    }
    );
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {

    }
    );
    DirectSms.sendDirectSms("+919106657401", "hello there");
    try {
      GoogleSignin.configure({
        webClientId: '355787712509-7caprn98f0216n5u4plh5hr8mt4g6coj.apps.googleusercontent.com'
      })
      const { idToken } = await GoogleSignin.signIn();
      console.log(idToken);
      console.log("executed");
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      var user = await auth().signInWithCredential(googleCredential);
      if (user) {
        console.log("route to register emergency contact");
        navigation.replace('emergency_contact_register');
      } else {

      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('The Sign In operation was aborted!');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        console.log(error, statusCodes.SIGN_IN_REQUIRED);
        alert('error')
        // some other error happened
      }
    }
  }
  return (
    <View style={styles.container}>
      <Image resizeMode='cover' style={styles.logo} source={require('./../assets/logo.png')}></Image>
      <View style={styles.header}>
        <Text style={{ color: "black" }}>Login Details</Text>
      </View>
      <View style={styles.sectionStyle}>
        <FontAwesomeIcon icon={faUser} style={styles.imageStyle}></FontAwesomeIcon>
        <TextInput
          placeholder="Enter Your Email Address Here"
          placeholderTextColor={'black'}
          underlineColorAndroid="transparent"
          onChange={value => { setemail(value) }}
        />
      </View>
      <View style={styles.sectionStyle}>
        <FontAwesomeIcon icon={faEyeSlash} style={styles.imageStyle}></FontAwesomeIcon>
        <TextInput
          placeholder="Password"
          placeholderTextColor={'black'}
          underlineColorAndroid="transparent"
          onChange={value => setpassword(value)}
        />
      </View>
      <View>
        <Text style={{ textAlign: 'right', marginRight: 25, marginBottom: 20, color: '#0B6EFE' }}>Forgot Password?</Text>
      </View>
      {/* <TouchableOpacity  containerStyle={{ backgroundColor: '#0B6EFE', marginRight: 20, marginLeft: 20, padding: 20, borderRadius: 20 }}><Text style={{ color: 'white', textAlign: 'center', alignSelf: 'center' }}>Login</Text></TouchableOpacity> */}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, marginLeft: 20, height: 1, backgroundColor: 'black' }} />
        <View>
          <Text style={{ width: 50, textAlign: 'center' }}>Or</Text>
        </View>
        <View style={{ flex: 1, marginRight: 20, height: 1, backgroundColor: 'black' }} />
      </View>
      <View>
        <GoogleSigninButton onPress={() => googleSignIn()} style={{ alignSelf: 'center' }}></GoogleSigninButton>
      </View>
      <View style={{ height: 20 }}></View>
      <View>
        <View style={[{ height: 48, width: 230, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', elevation: 4, backgroundColor: 'white', shadowColor: 'black' }]}>
          <FontAwesomeIcon icon={faApple} style={styles.imageStyle}></FontAwesomeIcon>
          <Text style={{ textAlign: 'center', flex: 1, alignSelf: 'center', color: 'black' }}>Sign In</Text>
        </View>
      </View>
      <View style={{ height: 20 }}></View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, marginLeft: 20, marginTop: 10, height: 1, backgroundColor: 'black' }} />
        <View>
          <Text style={{ width: 50, textAlign: 'center' }}>Or</Text>
        </View>
        <View style={{ flex: 1, marginRight: 20, height: 1, backgroundColor: 'black' }} />
      </View>
      <View style={{ height: 20 }}></View>

      <TouchableOpacity onPress={() => { navigation.navigate('register'); }} style={{ backgroundColor: 'red', width: "30%", padding: 20, borderRadius: 10, alignSelf: "center" }}><Text style={{ color: 'white', textAlign: 'center', alignSelf: 'center', justifyContent: "center" }}>Register</Text></TouchableOpacity>

    </View>
  )
}

export default Login_SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  logo: {
    // backgroundColor:"red",
    marginTop: 40,
    height: "30%",
    width: "50%",
    alignSelf: "center",
  },
  header: {
    // paddingTop: 150,
    marginLeft: 20,
    marginBottom: 20
  },
  sectionStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
    paddingLeft: 20,

  },
  imageStyle: {
    // padding: 10,
    marginRight: 20,
    marginLeft: 20,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
    alignSelf: 'center'
  },
  rectangle29: {
    width: 132,
    height: 3,
    backgroundColor: '#1E1E1E',
    //   gap: 12,

  },
})