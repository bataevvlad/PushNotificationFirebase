import { useEffect, useState } from 'react';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import {FirebaseNotificationService} from '../services/notificationFirebase.service.ts';

export const useFirebaseNotifications = () => {
  const [firebaseNotificationService] = useState<FirebaseNotificationService>(() => new FirebaseNotificationService());

  const handleForegroundMessage = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    console.log('Foreground Message:', remoteMessage);
    Alert.alert('Foreground Message', JSON.stringify(remoteMessage));
  };

  const handleBackgroundMessage = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    console.log('Background Message:', remoteMessage);
  };

  const handleTokenRefresh = (token: string) => {
    console.log('FCM Token refreshed:', token);
  };

  useEffect(() => {
    firebaseNotificationService.addEventListener(
      'onForegroundMessage',
      handleForegroundMessage
    );

    firebaseNotificationService.addEventListener(
      'onBackgroundMessage',
      handleBackgroundMessage
    );

    firebaseNotificationService.addEventListener(
      'onTokenRefresh',
      handleTokenRefresh
    );

    const unsubscribe = firebaseNotificationService.listenForMessages();

    return () => {
      unsubscribe();
      firebaseNotificationService.clearAllListeners();
    };
  }, [firebaseNotificationService]);

  return firebaseNotificationService;
};
