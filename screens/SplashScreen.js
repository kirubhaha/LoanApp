import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#4facfe', '#00f2fe']}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.appName}>Credit Sure Capital</Text>

      {/* Optional Skip Button */}
      <TouchableOpacity onPress={() => navigation.replace('LoginScreen')} style={styles.button}>
        <Text style={styles.buttonText}>Start Now</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '300',
    marginBottom: 4,
  },
  appName: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#ffffff33',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SplashScreen;
