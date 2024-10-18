import {LogLevel, OneSignal} from 'react-native-onesignal';

export class OneSignalService {
  private notificationClickListener: ((event: any) => void) | null = null;
  private permissionChangeListener: ((granted: boolean) => void) | null = null;
  private subscriptionChangeListener: ((event: any) => void) | null = null;

  constructor(appId: string) {
    this.initialize(appId);
  }

  private initialize(appId: string) {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(appId);
    OneSignal.Notifications.requestPermission(true);

    this.notificationClickListener = this.handleNotificationClick.bind(this);
    OneSignal.Notifications.addEventListener('click', this.notificationClickListener);

    this.permissionChangeListener = this.handlePermissionChange.bind(this);
    OneSignal.Notifications.addEventListener('permissionChange', this.permissionChangeListener);

    this.subscriptionChangeListener = this.handleSubscriptionChange.bind(this);
    OneSignal.User.pushSubscription.addEventListener('change', this.subscriptionChangeListener);
  }

  private handleNotificationClick(event: any) {
    console.log('OneSignal: notification clicked:', event);
  }

  private handlePermissionChange(granted: boolean) {
    console.log('OneSignal: notification permission changed:', granted);
  }

  private handleSubscriptionChange(event: any) {
    console.log('OneSignal: subscription state changed:', event);
  }

  public cleanupListeners() {
    if (this.notificationClickListener) {
      OneSignal.Notifications.removeEventListener('click', this.notificationClickListener);
    }
    if (this.permissionChangeListener) {
      OneSignal.Notifications.removeEventListener('permissionChange', this.permissionChangeListener);
    }
    if (this.subscriptionChangeListener) {
      OneSignal.User.pushSubscription.removeEventListener('change', this.subscriptionChangeListener);
    }
  }
}
