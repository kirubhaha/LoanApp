import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SchemeCard from '../components/SchemeCard'; // Assuming your SchemeCard component is customized
import { LinearGradient } from 'expo-linear-gradient'; // For gradient background

const SCHEME_DATA = [
  { id: 'scheme1', name: 'Capital 1', monthlyPayment: 1000, totalAmount: 60000, returnAmount: 100000 },
  { id: 'scheme2', name: 'Capital 2', monthlyPayment: 2000, totalAmount: 120000, returnAmount: 200000 },
  { id: 'scheme3', name: 'Capital 3', monthlyPayment: 3000, totalAmount: 180000, returnAmount: 300000 },
  { id: 'scheme4', name: 'Capital 4', monthlyPayment: 4000, totalAmount: 240000, returnAmount: 400000 },
  { id: 'scheme5', name: 'Capital 5', monthlyPayment: 5000, totalAmount: 300000, returnAmount: 500000 },
  { id: 'scheme6', name: 'Capital 6', monthlyPayment: 10000, totalAmount: 600000, returnAmount: 1000000 },
  { id: 'scheme7', name: 'Capital 7', monthlyPayment: 15000, totalAmount: 900000, returnAmount: 1500000 },
  { id: 'scheme8', name: 'Capital 8', monthlyPayment: 20000, totalAmount: 1200000, returnAmount: 2000000 },
  { id: 'scheme9', name: 'Capital 9', monthlyPayment: 25000, totalAmount: 1500000, returnAmount: 2500000 },
  { id: 'scheme10', name: 'Capital 10', monthlyPayment: 30000, totalAmount: 1800000, returnAmount: 3000000 },
  { id: 'scheme11', name: 'Capital 11', monthlyPayment: 35000, totalAmount: 2100000, returnAmount: 3500000 },
  { id: 'scheme12', name: 'Capital 12', monthlyPayment: 40000, totalAmount: 2400000, returnAmount: 4000000 },
  { id: 'scheme13', name: 'Capital 13', monthlyPayment: 45000, totalAmount: 2700000, returnAmount: 4500000 },
  { id: 'scheme14', name: 'Capital 14', monthlyPayment: 50000, totalAmount: 3000000, returnAmount: 5000000 },
  { id: 'scheme15', name: 'Capital 15', monthlyPayment: 100000, totalAmount: 6000000, returnAmount: 10000000 },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSchemePress = (scheme) => {
    navigation.navigate('SchemeDetailScreen', { scheme });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#8e44ad', '#2980b9']} style={styles.headerGradient}>
        <Text style={styles.header}>Available Schemes</Text>
      </LinearGradient>

      <FlatList
        data={SCHEME_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SchemeCard
            scheme={item}
            onPress={() => handleSchemePress(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerGradient: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
});

export default HomeScreen;
