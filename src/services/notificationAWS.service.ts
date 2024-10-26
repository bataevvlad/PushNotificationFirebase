import {
  onNotificationOpened,
  onNotificationReceivedInBackground,
  onNotificationReceivedInForeground,
  onTokenReceived,
  OnTokenReceivedOutput,
  OnNotificationOpenedOutput,
  OnNotificationReceivedInBackgroundOutput,
  OnNotificationReceivedInForegroundOutput,
} from 'aws-amplify/push-notifications';

export class AWSPushService {
  private tokenListener: OnTokenReceivedOutput | null = null;
  private notificationOpenedListener: OnNotificationOpenedOutput | null = null;
  private backgroundNotificationListener: OnNotificationReceivedInBackgroundOutput | null = null;
  private foregroundNotificationListener: OnNotificationReceivedInForegroundOutput | null = null;

  constructor() {
    this.init().then(() => {});
  }

  private async init() {
    try {
      this.handleForegroundNotifications();
      this.handleBackgroundNotifications();
      this.handleNotificationOpened();
      this.handleTokenReceived();
    } catch (error) {
      console.error('Failed to initialize push notifications:', error);
    }
  }

  private handleForegroundNotifications() {
    this.foregroundNotificationListener = onNotificationReceivedInForeground((input) => {
      console.log('AWS Foreground notification received:', input);
    });
  }

  private handleBackgroundNotifications() {
    this.backgroundNotificationListener = onNotificationReceivedInBackground((input) => {
      console.log('AWS Background notification received:', input);
    });
  }

  private handleNotificationOpened() {
    this.notificationOpenedListener = onNotificationOpened((input) => {
      console.log('AWS Notification opened:', input);
    });
  }

  private handleTokenReceived() {
    this.tokenListener = onTokenReceived((input) => {
      console.log('AWS Push token received:', input);
    });
  }

  public removeListeners() {
    this.tokenListener?.remove();
    this.notificationOpenedListener?.remove();
    this.backgroundNotificationListener?.remove();
    this.foregroundNotificationListener?.remove();
    console.log('All AWS notification listeners removed');
  }
}
