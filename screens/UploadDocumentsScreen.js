import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function UploadDocumentsScreen({ navigation, route }) {
  const [clientPhoto, setClientPhoto] = useState(null);
  const [aadharPhoto, setAadharPhoto] = useState(null);
  const [nomineePhoto, setNomineePhoto] = useState(null);

  const { userType } = route.params;

  const pickImage = async (setImage) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Denied', 'Access to media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async (setImage) => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Denied', 'Access to camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!clientPhoto || !aadharPhoto || !nomineePhoto) {
      Alert.alert('Incomplete', 'Please upload all three images before submitting.');
      return;
    }

    navigation.replace('ProfitCustomerScreen');
  };

  const handleNormalUser = () => {
    navigation.navigate('HomeScreen');
  };

  const handleProfitUser = () => {
    navigation.navigate('ProfitCustomerListScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Upload Required Documents</Text>
      <Text style={styles.subtitle}>Please upload clear photos of all documents</Text>

      {[
        ['Client Photo', clientPhoto, setClientPhoto],
        ['Aadhaar Card', aadharPhoto, setAadharPhoto],
        ['Nominee Aadhaar Photo', nomineePhoto, setNomineePhoto]
      ].map(([label, image, setter]) => (
        <View style={styles.imageSection} key={label}>
          <Text style={styles.imageLabel}>{label}</Text>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <View style={styles.placeholder} />
          )}
          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => pickImage(setter)}
            >
              <Text style={styles.buttonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => takePhoto(setter)}
            >
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

     

      {/* NEW BUTTONS */}
      <View style={styles.userButtons}>
        <TouchableOpacity style={styles.normalButton} onPress={handleNormalUser}>
          <Text style={styles.userButtonText}>I'm a Normal User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profitButton} onPress={handleProfitUser}>
          <Text style={styles.userButtonText}>I'm a Profit User</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 30,
    textAlign: 'center',
  },
  imageSection: {
    marginBottom: 25,
    width: '100%',
    alignItems: 'center',
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#ecf0f1',
  },
  placeholder: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#ecf0f1',
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderStyle: 'dashed',
  },
  buttonGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    backgroundColor: '#3498db',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
  submitButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#27ae60',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userButtons: {
    marginTop: 30,
  },
  normalButton: {
    backgroundColor: '#2980b9',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  profitButton: {
    backgroundColor: '#1abc9c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  userButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
