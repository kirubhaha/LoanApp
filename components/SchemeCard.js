import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SchemeCard = memo(({ scheme = {}, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <LinearGradient
        colors={scheme.gradientColors || ['#6a11cb', '#2575fc']} // Dynamic gradient colors
        style={styles.gradient}
      >
        <Text style={styles.schemeName}>{scheme.name || 'Unnamed Scheme'}</Text>
        <Text style={styles.schemeAmount}>Total Amount: ₹{scheme.totalAmount ? scheme.totalAmount : 'N/A'}</Text>
        <Text style={styles.schemeMonthly}>Monthly Payment: ₹{scheme.monthlyPayment ? scheme.monthlyPayment : 'N/A'}</Text>
        <Text style={styles.schemeReturn}>Return: ₹{scheme.returnAmount ? scheme.returnAmount : 'N/A'}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
});

SchemeCard.propTypes = {
  scheme: PropTypes.shape({
    name: PropTypes.string,
    totalAmount: PropTypes.number,
    monthlyPayment: PropTypes.number,
    returnAmount: PropTypes.number,
    gradientColors: PropTypes.arrayOf(PropTypes.string), // Optional prop for dynamic gradient colors
  }),
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 10,
  },
  gradient: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  schemeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  schemeAmount: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  schemeMonthly: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  schemeReturn: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
});

export default SchemeCard;
