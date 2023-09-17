import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { firebase } from '@react-native-firebase/database'
const DemoNotification = () => {
    firebase.app().database('https://syloapplication-default-rtdb.firebaseio.com/').ref('/notification/1').push({ name: "Tester", age: 30 }).then(() => { console.log("set") });
    return (
        <View>
            <Text>DemoNotification</Text>
            <TouchableOpacity style={{}}>
                <Text>Push Notification!</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DemoNotification

const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        width: "50%",
        padding: "20"
    }
})