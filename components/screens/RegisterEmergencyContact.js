import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { amber100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
const RegisterEmergencyContact = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const phoneInput=useRef<PhoneInput>(null);
  // const [phoneInput, setphoneInput] = useState(false);
  return (

    <SafeAreaView style={styles.wrapper}>
      <Text style={{fontSize:20,fontWeight:"bold"}}>Please Enter A Emergency Contact Number</Text>
      <View style={{height:20}}></View>
      {/* {showMessage && (
        <View style={styles.message}>
          <Text>Value : {value}</Text>
          <Text>Formatted Value : {formattedValue}</Text>
          <Text>Valid : {valid ? "true" : "false"}</Text>
        </View>
      )} */}
      <PhoneInput
        // ref={phoneInput}
        defaultValue={value}
        defaultCode="IN"
        layout="first"
        onChangeText={(text) => {
          setValue(text);
        }}
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
        }}
        withDarkTheme
        withShadow
        autoFocus
      />
      <TouchableOpacity
        style={styles.button}
        onPress={async() => {
          try {
          await AsyncStorage.setItem("emergencyContact",formattedValue);
            
          } catch (error) {
            
          }finally{
            navigation.replace("bottomtab");
          }
          
        }}
      >
        <Text style={{ paddingLeft: 10, paddingRight: 10 }}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default RegisterEmergencyContact

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    flex: 1,
    alignSelf: "center"
  },
  button: {
    backgroundColor: 'red', width: "40%", padding: 10, borderRadius: 10, alignSelf: 'center', marginTop: 30
  }
})