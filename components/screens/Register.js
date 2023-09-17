import { StyleSheet, Text, View, ActivityIndicator,Image,TouchableOpacity,ScrollView,Alert } from 'react-native'
import { TextInput } from 'react-native-paper';
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import auth, { firebase } from '@react-native-firebase/auth'


const Register = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePass, sethidePass] = useState(false);
    const [loading, setloading] = useState(false);
    async function _registerUser() {
        setloading(true);
        console.log(email);
        console.log(password);
        try{
            auth().createUserWithEmailAndPassword(email, password).then(() => {
                setloading(false);
                Alert.alert("Success", "Registeration Successful!", [
                  {
                    text: "Proceed",
                    onPress: () => {
                      navigation.replace("BottomTab");
                    },
                    style: 'cancel'
                  }
                ]);
              }).catch(error => {
                setloading(false);
                if (error.code === 'auth/email-already-in-use') {
                  Alert.alert("Email Already In Use!", "The email has previously used please login with the credentials!", [
                    {
                      text: "Proceed",
                      onPress: () => {
                        navigation.replace("LoginScreen");
                      },
                      style: 'cancel'
                    }
                  ]
                  )
                }
          
                if (error.code === 'auth/invalid-email') {
                  console.log('That email address is invalid!');
                  Alert.alert("Error", "That email address is invalid!", [
                    {
                      text: "retry",
                      style: 'cancel'
                    }
                  ]
                  )
                }
                console.error(error);
              })
        }catch(e){
            setloading(false);
            Alert.alert("Error", "Some thing went wrong!!", [
                {
                  text: "retry",
                  style: 'cancel'
                }
              ]
              )
        }
       
    
      }
    return (
        !loading ? <ScrollView>
            <Text style={{
                paddingRight: 20, paddingTop: 30,
                paddingLeft: 40, fontSize: 18, fontWeight: "bold", color: "black"
            }}>Let's Get You Started</Text>
            <Image style={{alignSelf:"center"}} source={require('./../assets/logo.png')} resizeMode='cover'></Image>
            <View style={{ alignItems: "center", height: "60%" }}>
          <TextInput
            label="Email"
            outlineColor="black"
            activeOutlineColor="#326A81"
            autoCapitalize="none"
            returnKeyType="next"
            mode="outlined"
            selectionColor="#326A81"
            onChangeText={value => { setEmail(value) }}
            style={{ width: "70%" }}
          ></TextInput>
          <View style={{ height: 20 }}></View>
          <TextInput
            label="Password"
            outlineColor="black"
            activeOutlineColor="#326A81"
            autoCapitalize="none"
            returnKeyType="next"
            mode="outlined"
            secureTextEntry={hidePass ? true : false}
            selectionColor="#326A81"
            right={
              <TextInput.Icon icon={(size, color) => (
                <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
              )} iconColor="black" onPress={() => sethidePass(!hidePass)}></TextInput.Icon>
            }
            onChangeText={value => { setPassword(value) }}
            style={{ width: "70%" }}
          ></TextInput>
          <View style={{ height: 20 }}></View>

          <TouchableOpacity onPress={() => _registerUser()} style={{ backgroundColor: 'red', width: "30%", padding: 20, borderRadius: 10 }}><Text style={{ color: 'white', textAlign: 'center', alignSelf: 'center' }}>Register</Text></TouchableOpacity>
          <View style={{height:20}}></View>
        </View>
        </ScrollView> : <View style={{ flex: 1 }}>
            <ActivityIndicator size="large" style={{ flex: 1 }}></ActivityIndicator>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({})