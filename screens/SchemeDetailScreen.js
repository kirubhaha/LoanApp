import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
  Image,
} from 'react-native';

const schemes = [
  { id: '1', name: 'Scheme 1', range: '₹100,000 - ₹200,000', amount: 100000 },
  { id: '2', name: 'Scheme 2', range: '₹200,001 - ₹300,000', amount: 200001 },
  { id: '3', name: 'Scheme 3', range: '₹300,001 - ₹400,000', amount: 300001 },
  { id: '4', name: 'Scheme 4', range: '₹400,001 - ₹500,000', amount: 400001 },
  { id: '5', name: 'Scheme 5', range: '₹500,001 - ₹600,000', amount: 500001 },
];

const ProfitCustomerListScreen = () => {
  const upiId = 'vg4vnhoe6oi5@idbi';  // Fixed UPI ID

  const handlePayment = async (scheme) => {
    const amount = scheme.amount;
    const upiUrl = `upi://pay?pa=${upiId}&pn=ProfitApp&am=${amount}&cu=INR`;

    const supported = await Linking.canOpenURL(upiUrl);

    if (supported) {
      await Linking.openURL(upiUrl);
    } else {
      Alert.alert('Error', 'No UPI app found to make payment');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profit Based Schemes</Text>

      <FlatList
        data={schemes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.customerName}>{item.name}</Text>
            <Text style={styles.scheme}>Amount Range: {item.range}</Text>

            {/* UPI Payment Button */}
            <TouchableOpacity style={styles.payButton} onPress={() => handlePayment(item)}>
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>

            {/* QR Code Display */}
            <Text style={styles.qrTitle}>Or scan to pay:</Text>
            <Image
              source={require('../assets/Scanner.png')} // Ensure this file exists
              style={styles.qrImage}
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
};

export default ProfitCustomerListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  scheme: {
    fontSize: 16,
    color: '#7f8c8d',
    marginVertical: 10,
  },
  payButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrTitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    textAlign: 'center',
  },
  qrImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 10,
  },
});
