import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../utils/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ProfitScreen = () => {
  const [profitId, setProfitId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleNext = async () => {
    // Validate input
    if (!profitId.trim()) {
      Alert.alert('Error', 'Please enter a Profit ID');
      return;
    }

    if (!/^CSC\d{2}$/i.test(profitId)) {
      Alert.alert(
        'Invalid ID Format', 
        'Profit ID must start with CSC followed by 2 digits (e.g., CSC05)'
      );
      return;
    }

    setLoading(true);

    try {
      // Convert to uppercase for consistency
      const formattedId = profitId.toUpperCase();
      
      // Save to Firestore with additional metadata
      await addDoc(collection(db, 'profitIds'), {
        profitId: formattedId,
        createdAt: serverTimestamp(),
        status: 'pending'
      });

      // Navigate to next screen
      navigation.navigate('SignUpStep1', { 
        userType: 'profit',
        profitId: formattedId 
      });
      
    } catch (error) {
      console.error('Firestore Error:', error);
      Alert.alert(
        'Connection Error',
        error.message.includes('network') 
          ? 'Please check your internet connection'
          : 'Failed to verify Profit ID. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profit Login</Text>
      <Text style={styles.subtitle}>Enter your authorized Profit ID</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter Profit ID (e.g., CSC05)"
        placeholderTextColor="#999"
        value={profitId}
        onChangeText={setProfitId}
        maxLength={5}
        autoCapitalize="characters"
        keyboardType="default"
        autoCorrect={false}
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton]} 
        onPress={handleNext}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify & Continue</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 25,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfitScreen;