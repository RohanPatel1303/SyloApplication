import { StyleSheet, Text, View, SectionList,TouchableOpacity,SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Card, Chip, Modal, PaperProvider, Portal } from 'react-native-paper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import UserProfile from './UserProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmergencyContacts = () => {
  const [visible, setVisible] = React.useState(false);
  const [selectedItem, setselectedItem] = useState();
  const [data,setdata]=useState();
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  useEffect(() => {
    getEmergencyContacts();
  
    return () => {
      
    }
  }, [])
  getEmergencyContacts=async()=>{
    try{
      const value=await AsyncStorage.getItem("emergencyContact");
      if(value!==null){
        setdata(value);
        console.log(value);
      }else{
        console.log("no data");
      }

    }catch(e){
      console.log("error")
    }
  }
  return (
    <PaperProvider>
    <View style={{ flex: 1, margin: 10 }}>
      <Portal>
        <Modal visible={visible} onDismiss={() => { setVisible(false) }} contentContainerStyle={containerStyle}>
          <UserProfile item={selectedItem}></UserProfile>
        </Modal>
      </Portal>
      
      <View style={styles.container}>
        <SectionList
          sections={[
            { title: 'D', data: ['Devin', 'Dan', 'Dominic'] },
            {
              title: 'J',
              data: [
                'Jackson',
                'James',
                'Jillian',
                'Jimmy',
                'Joel',
                'John',
                'Julie',
              ],
            },
          ]}
          renderItem={({ item }) => <TouchableOpacity onPress={() => { setVisible(true),setselectedItem(item) }} ><Text style={styles.item}>{item}</Text></TouchableOpacity>}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={item => `basicListEntry-${item}`}
        />
      </View>
    </View>
    </PaperProvider>

  )
}

export default EmergencyContacts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});