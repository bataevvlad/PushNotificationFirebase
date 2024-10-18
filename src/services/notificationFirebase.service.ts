import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

type ListenerCallback = (data: any) => void;

export class FirebaseNotificationService {
  private listeners: { [key: string]: ListenerCallback[] } = {};

  constructor() {
    this.init();
  }

  private init() {
    this.requestPermission();
    this.getToken();
    this.setBackgroundMessageHandler();
    this.setTokenRefreshListener();
  }

  async requestPermission(): Promise<void> {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    } else {
      console.log('Permission denied:', authStatus);
    }
  }

  async getToken(): Promise<string | undefined> {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  }

  private setBackgroundMessageHandler(): void {
    messaging().setBackgroundMessageHandler(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
      this.triggerEvent('onBackgroundMessage', remoteMessage);
    });
  }

  private setTokenRefreshListener(): void {
    messaging().onTokenRefresh((token: string) => {
      console.log('Token refreshed:', token);
      this.triggerEvent('onTokenRefresh', token);
    });
  }

  listenForMessages(): () => void {
    return messaging().onMessage(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      this.triggerEvent('onForegroundMessage', remoteMessage);
    });
  }

  addEventListener(eventType: string, callback: ListenerCallback): void {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
  }

  private triggerEvent(eventType: string, data: any): void {
    if (this.listeners[eventType]) {
      this.listeners[eventType].forEach(callback => callback(data));
    }
  }

  removeEventListener(eventType: string, callback: ListenerCallback): void {
    if (this.listeners[eventType]) {
      this.listeners[eventType] = this.listeners[eventType].filter(listener => listener !== callback);
    }
  }

  clearAllListeners(): void {
    this.listeners = {};
  }
}
