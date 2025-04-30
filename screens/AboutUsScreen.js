import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutUsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Us</Text>

      <Text style={styles.paragraph}>
        Welcome to CSC Capital, the premier platform connecting visionary investors with high-potential opportunities across diverse industries. 
        We believe that investment is not just about growing wealth — it's about building a better future.
      </Text>

      <Text style={styles.sectionTitle}>Our Investment Sectors:</Text>

      <Text style={styles.listItem}>• Women's Development: Empowering women entrepreneurs and initiatives that create lasting social impact.</Text>
      <Text style={styles.listItem}>• Real Estate: Unlocking lucrative opportunities in residential, commercial, and industrial properties.</Text>
      <Text style={styles.listItem}>• Microfinance: Supporting small businesses and communities through sustainable micro-lending investments.</Text>
      <Text style={styles.listItem}>• Medical Investment: Advancing healthcare innovation and facilities for a healthier tomorrow.</Text>
      <Text style={styles.listItem}>• Company Investment: Partnering with emerging and established companies poised for growth and success.</Text>
      <Text style={styles.listItem}>• Export & Import Missionary Manufacturing Investment: Fostering global trade and economic development.</Text>
      <Text style={styles.listItem}>• Hospital Equipment Investment: Revolutionizing healthcare delivery by investing in medical equipment.</Text>
      <Text style={styles.listItem}>• Construction Investment: Powering infrastructure projects that shape modern cities and communities.</Text>
      <Text style={styles.listItem}>• School and College Investment: Building the foundation for future generations through educational institutions.</Text>
      <Text style={styles.listItem}>• Highway Property Investment: Capitalizing on growth potential along major highways.</Text>

      <Text style={styles.paragraph}>
        At CSC Capital, we simplify the investment journey, providing tools, insights, and trusted opportunities — all in one dynamic, easy-to-use app. 
        Whether you're a seasoned investor or new to the market, we're here to help you invest confidently and create meaningful change.
      </Text>

      <Text style={styles.paragraph}>
        We have also invested in many MNC companies and are major shareholders. 
        We are on a mission to ensure a women-empowered society. We are a government-authorized and registered company.
      </Text>

      <Text style={styles.paragraph}>
        Join us today and be a part of building a brighter, stronger future with CSC Capital.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8e44ad',
    marginVertical: 15,
  },
  listItem: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default AboutUsScreen;
