import React from 'react';
import { Text, View } from 'react-native';
import {useFirebaseNotifications} from './src/hooks/useFirebaseNotifications.tsx';

const App: React.FC = () => {
  useFirebaseNotifications();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold' }}>
        Push Notifications App.
      </Text>
    </View>
  );
};

export default App;
