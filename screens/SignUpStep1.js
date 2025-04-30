import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../utils/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const SignUpStep1 = () => {
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [referralId, setReferralId] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { userType } = route.params || {}; // 'profit' or 'normal'

  const handleSignUp = async () => {
    if (!username || !dob || !referralId) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    try {
      // Save user data to Firestore
      await addDoc(collection(db, 'users'), {
        username,
        dob,
        referralId,
        userType,
      });

      // Navigate to the Upload Documents screen
      navigation.replace('UploadDocumentsScreen', { userType });
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Signup failed. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Account Number / Mobile"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth (DD/MM/YYYY)"
        value={dob}
        onChangeText={setDob}
      />
      <TextInput
        style={styles.input}
        placeholder="Referral ID"
        value={referralId}
        onChangeText={setReferralId}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUpStep1;
