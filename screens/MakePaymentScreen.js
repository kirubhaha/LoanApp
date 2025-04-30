import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { savePaymentData } from '../utils/paymentUtils'; // Import the savePaymentData function

const upiId = 'Vigneshram1811-1@oksbi'; // Replace with your actual UPI ID

const MakePaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { schemeId, amount, senderPhone, receiverPhone } = route.params || {};

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const upiUrl = `upi://pay?pa=${upiId}&pn=YourAppName&am=${amount}&cu=INR&tid=${Date.now()}`;
      const supported = await Linking.canOpenURL(upiUrl);

      if (supported) {
        await Linking.openURL(upiUrl);
      } else {
        Alert.alert('Error', 'No UPI app found to make payment');
      }

      setTimeout(async () => {
        try {
          // Save payment details to Firestore after a successful payment
          const paymentDetails = {
            schemeId,
            amount,
            senderPhone,
            receiverPhone,
            paymentDate: new Date(),
            status: 'Completed', // You can adjust this status based on actual payment status
          };

          await savePaymentData(paymentDetails); // Call the function to save the payment data
          Alert.alert('✅ Payment Successful', `₹${amount} successfully paid for Scheme ${schemeId}.`);
          navigation.goBack();
        } catch (error) {
          console.error('❌ Payment Error:', error);
          Alert.alert('❌ Payment Failed', 'There was an issue saving payment details.');
        }
      }, 2000);

    } catch (error) {
      console.error('❌ Payment Error:', error);
      Alert.alert('❌ Payment Failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!schemeId || !amount || !senderPhone || !receiverPhone) {
    Alert.alert('Error', 'Missing required payment details.');
    return null;
  }

  return (
    <LinearGradient colors={['#8e44ad', '#3498db']} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Confirm Payment</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Scheme ID:</Text>
          <Text style={styles.value}>{schemeId}</Text>

          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>₹{amount}</Text>

          <Text style={styles.label}>From:</Text>
          <Text style={styles.value}>{senderPhone}</Text>

          <Text style={styles.label}>To:</Text>
          <Text style={styles.value}>{receiverPhone}</Text>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handlePayment} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payText}>Pay Now</Text>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default MakePaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    alignItems: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  label: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  payButton: {
    backgroundColor: '#27ae60',
    padding: 18,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  payText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
