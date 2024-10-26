import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useFirebaseNotifications} from './src/hooks/useFirebaseNotifications.tsx';
import {useOneSignal} from './src/hooks/useOneSignal.tsx';
import {
  withAuthenticator,
  useAuthenticator,
} from '@aws-amplify/ui-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAWS} from './src/hooks/useAWS.tsx';

const userSelector = (context: {user: any}) => [context.user];

const SignOutButton = () => {
  const { user, signOut } = useAuthenticator(userSelector);
  return (
    <Pressable onPress={signOut} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>
        Hello, {user.username}! Click here to sign out!
      </Text>
    </Pressable>
  );
};

const App: React.FC = () => {
  useFirebaseNotifications();
  useOneSignal();
  useAWS();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SignOutButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { width: 400, flex: 1, padding: 20, alignSelf: 'center' },
  todo: { marginBottom: 15 },
  input: {
    backgroundColor: '#ddd',
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 8,
  },
  buttonText: { color: 'white', padding: 16, fontSize: 18 },
});

export default withAuthenticator(App);
