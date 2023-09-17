import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';

const UserProfile = ({item}) => {
    console.log(item);
    const user = {
      name: 'John Doe',
      bio: '+91 013909210xx | abc@xyz.com',
    //   profilePicture: require(''),
      // Add more user details as needed
    };
  
    return (
      <View style={styles.container}>
        {/* <Image source={user.profilePicture} style={styles.profilePicture} /> */}
        <Text style={styles.name}>{item}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
        <View style={{flexDirection:"row"}}>
        <Button><Text>Change Details</Text></Button>
        <Button><Text>Remove Contact</Text></Button>
        </View>

        {/* Add more user details here */}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      padding: 16,
    },
    profilePicture: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 12,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    bio: {
      fontSize: 16,
      textAlign: 'center',
      color: '#666',
    },
  });
  
  export default UserProfile;
  