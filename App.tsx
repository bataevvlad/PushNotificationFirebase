import React from 'react';
import { Text, View } from 'react-native';
import {useFirebaseNotifications} from './src/hooks/useFirebaseNotifications.tsx';
import {useOneSignal} from './src/hooks/useOneSignal.tsx';

const App: React.FC = () => {
  useFirebaseNotifications();
  useOneSignal();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold' }}>
        Push Notifications App.
      </Text>
    </View>
  );
};

export default App;
