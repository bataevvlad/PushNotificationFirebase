import { useEffect, useState } from 'react';
import {OneSignalService} from '../services/notificationOneSignal.service.ts';
import Config from 'react-native-config';

export const useOneSignal = () => {
  const [oneSignalService] = useState<OneSignalService>(() => new OneSignalService(Config.ONESIGNAL_APP_ID!));

  useEffect(() => {
    return () => {
      oneSignalService.cleanupListeners();
    };
  }, [oneSignalService]);

  return oneSignalService;
};
