import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Existing screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpStep1 from './screens/SignUpStep1';
import UploadDocumentsScreen from './screens/UploadDocumentsScreen';
import HomeScreen from './screens/HomeScreen';
import SchemeDetailScreen from './screens/SchemeDetailScreen';
import PaymentHistoryScreen from './screens/PaymentHistoryScreen';

// New screens
import AboutUsScreen from './screens/AboutUsScreen';
import ContactScreen from './screens/ContactScreen';
import ProfitScreen from './screens/ProfitScreen';
import ProfitCustomerListScreen from './screens/ProfitCustomerListScreen';
import MakePaymentScreen from './screens/MakePaymentScreen'; // Correct import

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        {/* Existing Screens */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpStep1" component={SignUpStep1} />
        <Stack.Screen name="UploadDocumentsScreen" component={UploadDocumentsScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SchemeDetailScreen" component={SchemeDetailScreen} />
        <Stack.Screen name="PaymentHistoryScreen" component={PaymentHistoryScreen} />

        {/* New Screens */}
        <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Profit" component={ProfitScreen} />
        <Stack.Screen name="ProfitCustomerListScreen" component={ProfitCustomerListScreen} />
        <Stack.Screen name="MakePaymentScreen" component={MakePaymentScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}  