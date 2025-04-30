import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const ContactScreen = () => {
  const phoneNumber = '9843671779'; // Dummy number

  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contact Us</Text>
      <TouchableOpacity onPress={handleCall} style={styles.callButton}>
        <Text style={styles.callText}>Call: {phoneNumber}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 20,
  },
  callButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
  },
  callText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ContactScreen;
