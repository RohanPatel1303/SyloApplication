import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import { Card,Button } from 'react-native-paper'

const Notifications = () => {
    const notifications = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'John Doe',
          sos: true
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'John Zavier',
          sos: false
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Avatar',
          sos: false
        },
      ];
    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ];
  return (
    <View style={{ flex: 1, backgroundColor: "#DFCCFB" }}>
    <View>
      
<FlatList
        data={notifications}
        renderItem={({ item }) => <Card theme={{ colors: { primary: 'red' } }} style={{ padding: 15, margin: 12 }}>
          <Card.Title title="Sos" theme={{ colors: { primary: 'red' } }}></Card.Title>
          <Card.Content>
            <Text>{item.title}</Text>
            {/* <Button><Text>Action</Text></Button> */}
          </Card.Content>
          <Card.Actions>
          <Button>Ignore</Button>
      <Button>Continue to Report</Button>
          </Card.Actions>
      
        </Card>}
        keyExtractor={item => item.id}
      />
    </View>
  </View>
  )
}

export default Notifications

const styles = StyleSheet.create({})