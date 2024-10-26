import { useState } from 'react';
import { AWSPushService } from '../services/notificationAWS.service.ts';

export const useAWS = (): AWSPushService => {
  const [awsService] = useState<AWSPushService>(() => new AWSPushService());
  return awsService;
};
