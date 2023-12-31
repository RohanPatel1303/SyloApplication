import React, { useState, useEffect } from 'react';
import {
StyleSheet,
Text,
View,
SafeAreaView,
Image,
TouchableHighlight,
ScrollView,
Platform} from 'react-native';
import Voice from '@react-native-community/voice';
export default function TextToSpeech() {
  const [Pitch, setPitch] = useState('');
  const [Error, setError] = useState('');
  const [Results, setResults] = useState([]);
  const [Started, setStarted] = useState('');
  const [End, setEnd] = useState('');
  const [PartialResults, setPartialResults] = useState([]);
useEffect(() => {
function onSpeechStart(e) {
  console.log('onSpeechStart: ', e);
  setStarted('')
};
function onSpeechResults(e) {
  console.log('onSpeechResults: ', e);
  setResults(e.value)
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
return (
<SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Example of Speech to Text conversion / Voice Recognition
          </Text>
          <Text style={styles.instructions}>
            Press mike to start Recognition
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: '#B0171F',
              }}>{`Started: ${Started}`}</Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: '#B0171F',
              }}>{`End: ${End}`}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: '#B0171F',
              }}>{`Pitch \n ${Pitch}`}</Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: '#B0171F',
              }}>{`Error \n ${Error}`}</Text>
          </View>
          <TouchableHighlight
            onPress={this._startRecognizing}
            style={{ marginVertical: 20 }}>
            <Image
              style={styles.button}
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
              }}
            />
          </TouchableHighlight>
          <Text
            style={{
              textAlign: 'center',
              color: '#B0171F',
              marginBottom: 1,
              fontWeight: '700',
            }}>
            Partial Results
          </Text>
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
          <Text style={styles.stat}>Results</Text>
          <ScrollView style={{ marginBottom: 42 }}>
            {Results.map((result, index) => {
              return (
                <Text key={`result-${index}`} style={styles.stat}>
                  {result}
                </Text>
              );
            })}
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'space-between',
              position: 'absolute',
              bottom: 0,
            }}>
            <TouchableHighlight
              onPress={this._stopRecognizing}
              style={{ flex: 1, backgroundColor: 'red' }}>
              <Text style={styles.action}>Stop</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this._cancelRecognizing}
              style={{ flex: 1, backgroundColor: 'red' }}>
              <Text style={styles.action}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this._destroyRecognizer}
              style={{ flex: 1, backgroundColor: 'red' }}>
              <Text style={styles.action}>Destroy</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
)}
const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    paddingVertical: 8,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    marginTop: 30,
  },
});