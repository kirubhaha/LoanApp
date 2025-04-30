import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';  // For Firebase Authentication
import { firebaseApp } from '../utils/firebaseConfig';  // Your Firebase config

import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [referralId, setReferralId] = useState('');
  const [userType, setUserType] = useState(null); // New state to store user type (Normal or Profit)
  const navigation = useNavigation();

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);  // Firebase Auth instance

  const validateDate = (dob) => {
    // Validate the date format (DD/MM/YYYY)
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(dob);
  };

  const handleLogin = async () => {
    if (!username || !dob || !referralId || !userType) {
      Alert.alert('Validation Error', 'Please fill in all fields and select a user type.');
      return;
    }

    if (!validateDate(dob)) {
      Alert.alert('Invalid Date', 'Please enter a valid date of birth in DD/MM/YYYY format.');
      return;
    }

    try {
      // Query to find the user with the provided username and dob
      const usersRef = collection(db, 'users');
      const userQuery = query(
        usersRef,
        where('username', '==', username.trim()),
        where('dob', '==', dob.trim())
      );
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        Alert.alert('Login Failed', 'User not found. Please sign up.');
        return;
      }

      // Query to verify the referral ID
      const referralQuery = query(
        usersRef,
        where('referralId', '==', referralId.trim())
      );
      const referralSnapshot = await getDocs(referralQuery);

      if (referralSnapshot.empty) {
        Alert.alert('Invalid Referral', 'Referral ID is incorrect. Please try again.');
        return;
      }

      const userId = userSnapshot.docs[0].id;  // Get the user ID from Firestore snapshot
      const user = userSnapshot.docs[0].data();  // Get user data (optional)

      // Optionally, sign in the user anonymously with Firebase Authentication
      await signInAnonymously(auth);

      // Clear the inputs
      setUsername('');
      setDob('');
      setReferralId('');
      setUserType(null); // Reset userType

      // Navigate to the appropriate screen based on userType
      if (userType === 'normal') {
        navigation.replace('HomeScreen', { userId, username: user.username });
      } else if (userType === 'profit') {
        navigation.replace('ProfitCustomerListScreen', { userId, username: user.username });
      }

    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <LinearGradient colors={['#8e44ad', '#3498db']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.topLinks}>
            <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
              <Text style={styles.topLinkText}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
              <Text style={styles.topLinkText}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profit')}>
              <Text style={styles.topLinkText}>Profit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Credit Sure Capital</Text>

            <TextInput
              style={styles.input}
              placeholder="Account Number"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              keyboardType="default"
            />

            <TextInput
              style={styles.input}
              placeholder="Date of Birth (DD/MM/YYYY)"
              value={dob}
              onChangeText={setDob}
              keyboardType="numbers-and-punctuation"
            />

            <TextInput
              style={styles.input}
              placeholder="Referral ID"
              value={referralId}
              onChangeText={setReferralId}
              autoCapitalize="none"
            />

            {/* User Type Selection */}
            <View style={styles.userTypeContainer}>
              <TouchableOpacity
                style={[styles.userTypeButton, userType === 'normal' && styles.selectedButton]}
                onPress={() => setUserType('normal')}
              >
                <Text style={styles.userTypeText}>Normal User</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.userTypeButton, userType === 'profit' && styles.selectedButton]}
                onPress={() => setUserType('profit')}
              >
                <Text style={styles.userTypeText}>Profit User</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpStep1', { userType: 'normal' })}
            >
              <Text style={styles.signUpText}>New account? Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  topLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 20,
  },
  topLinkText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3498db',
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
  signUpText: {
    marginTop: 20,
    color: '#3498db',
    fontSize: 16,
    textAlign: 'center',
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  userTypeButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#3498db',
  },
  userTypeText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
