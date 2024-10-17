import React, {useEffect} from 'react';
import {Alert, Text, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const requestPermission = async () => {   const authStatus = await messaging().requestPermission();   console.log('Permission status:', authStatus); };

const App = () => {

  useEffect(() => {
    requestPermission();

    messaging()
      .getToken()
      .then(token => {
        console.log('FCM Token:', token);
      });

    messaging().onTokenRefresh(token => {
      console.log('Token refreshed:', token);
    });

    return messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  }, []);

  return (
    <View>
      <Text>Firebase Push Notifications Setup Complete!</Text>
    </View>
  );
};

export default App;
