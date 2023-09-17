import { Alert, PermissionsAndroid, StyleSheet, Text, View, TouchableOpacity, ScrollView, NativeModules } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import RNSoundLevel from 'react-native-sound-level'
import RNFS from 'react-native-fs'
import Voice from '@react-native-community/voice'
import AsyncStorage from '@react-native-async-storage/async-storage'
var DirectSms = NativeModules.DirectSms;
const Home = () => {
  const [isListening, setListening] = useState(false);
  const [recognizedText, setrecognizedText] = useState("");
  const [Pitch, setPitch] = useState('');
  const [Error, setError] = useState('');
  const [Results, setResults] = useState([]);
  const [Started, setStarted] = useState('');
  const [End, setEnd] = useState('');
  const [PartialResults, setPartialResults] = useState([]);
  const [emergencyContact, setemergencyContact] = useState('');
  useEffect(() => {
    function onSpeechStart(e) {
      console.log('onSpeechStart: ', e);
      setStarted('√')
    };
    function onSpeechResults(e) {
      DirectSms.sendDirectSms(emergencyContact, e[0]);
      // DirectSms.sendDirectSms("+919106657401", e[0]);
      console.log('onSpeechResults: ', e);
      setResults(e.value);
      alert("Sms Alert Sent","Sms was sent!");
    };
    function onSpeechPartialResults(e) {
      console.log('onSpeechPartialResults: ', e);
      setPartialResults(e.value)
    };
    function onSpeechVolumeChanged(e) {
      console.log('onSpeechVolumeChanged: ', e);
      setPitch(e.value)
    };
    Voice.onSpeechStart = onSpeechStart;
    // Voice.onSpeechEnd = onSpeechEnd;
    // Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  _startRecognizing = async () => {
    setPitch('')
    setError('')
    setStarted('')
    setResults([])
    setPartialResults([])
    setEnd('')
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };
  _stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };
  _destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    setPitch('')
    setError('')
    setStarted('')
    setResults([])
    setPartialResults([])
    setEnd('')
  };

  useEffect(() => {
    RNSoundLevel.onNewFrame = (data) => {
      // setdecibels(2L̥0 * Math.log10(data.rawValue));
      var decibels = 20 * Math.log10(data.rawValue);
      if (decibels > 80) {
        try {
          Voice.start();

        } catch (e) {
          console.log(e);
          console.log("the error")
        }
        // onStartRecord();
        // startRecognization();
        console.log(data, "the decibels", decibels);
      }
      return () => {
        // don't forget to stop it
        RNSoundLevel.stop();
      }
    }
  }, [])
  useEffect(() => {
    getPermissions();
    return () => {
      // don't forget to stop it
      RNSoundLevel.stop()
    }
  }, [])
  const getPermissions = async () => {
    try {
      if (PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            'title': 'Audio Record Permission',
            'message': 'App needs access to your microphone'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the microphone")
          RNSoundLevel.start();
        } else {
          console.log("Audio record permission denied")
        }
      }
      var jsonValue=await AsyncStorage.getItem("emergencyContact");
      if(jsonValue!=null){
        setemergencyContact(jsonValue);
      }
      console.log("teh emergency contact",jsonValue);
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        
        {/* <TouchableOpacity onPress={() =>startRecognization()} style={{ backgroundColor: 'red', width: "30%", padding: 20, borderRadius: 10 }}><Text style={{ color: 'white', textAlign: 'center', alignSelf: 'center' }}>Register</Text></TouchableOpacity> */}
        <ScrollView>
          {PartialResults.map((result, index) => {
            return (
              <Text
                key={`partial-result-${index}`}
                style={{
                  textAlign: 'center',
                  color: '#B0171F',
                  marginBottom: 1,
                  fontWeight: '700',
                }}>
                {Results}
              </Text>
            );
          })}
        </ScrollView>
        <Text>Your Transcribed Texts Will Be Shown Below</Text>
        <Text>{recognizedText}</Text>
        {/* <ScrollView style={{ marginBottom: 42 }}>
          {Results.map((result, index) => {
            return (
              <Text key={`result-${index}`} style={styles.stat}>
                {result}
              </Text>
            );
          })}
        </ScrollView> */}
      </SafeAreaView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
})