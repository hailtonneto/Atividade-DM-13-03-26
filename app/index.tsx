import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';

import { UpdateInProgress } from '@/components/update-in-progress';

export default function MainScreen() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <SafeAreaView style={[styles.root, darkTheme ? styles.darkBg : styles.lightBg]}>
      <StatusBar style={darkTheme ? 'light' : 'dark'} />
      <View style={styles.wrapper}>
        <View style={styles.topBar}>
          <Text style={[styles.modeLabel, darkTheme ? styles.textDark : styles.textLight]}>
            Tema: {darkTheme ? 'Escuro' : 'Claro'}
          </Text>
          <Switch
            value={darkTheme}
            onValueChange={setDarkTheme}
            thumbColor={darkTheme ? '#CFE0FF' : '#FFFFFF'}
            trackColor={{ false: '#A9BCEB', true: '#3F5CC9' }}
          />
        </View>

        <UpdateInProgress darkMode={darkTheme} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  lightBg: {
    backgroundColor: '#F5F8FF',
  },
  darkBg: {
    backgroundColor: '#0B1220',
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  modeLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  textLight: {
    color: '#1C2945',
  },
  textDark: {
    color: '#F4F7FF',
  },
});
