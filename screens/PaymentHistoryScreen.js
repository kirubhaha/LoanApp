import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from '../utils/firebaseConfig'; // Ensure your firebase config is exported properly

export default function PaymentHistoryScreen() {
  const [payments, setPayments] = useState([]);
  const [userPhone, setUserPhone] = useState('');
  
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    // Get the current user phone number
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserPhone(user.phoneNumber);
    }

    // Firestore query to fetch payment data
    const paymentsRef = collection(db, 'payments');
    const q = query(paymentsRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const paymentData = snapshot.docs.map((doc) => doc.data());
      setPayments(paymentData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment History</Text>
      <FlatList
        data={payments}
        renderItem={({ item }) => (
          <View style={styles.paymentCard}>
            <Text style={styles.paymentInfo}>Scheme: {item.schemeName}</Text>
            <Text style={styles.paymentInfo}>Amount: ₹{item.amount}</Text>
            <Text style={styles.paymentInfo}>Month: {item.currentMonth}</Text>
            <Text style={styles.paymentInfo}>Status: {item.paymentStatus}</Text>
            <Text style={styles.paymentInfo}>Phone: {item.userPhone}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 5,
  },
  paymentInfo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});
