/* eslint-disable prettier/prettier */
import {StyleSheet, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 1700);
  });

  return (
    <View style={styles.Container}>
      <StatusBar translucent backgroundColor="#fad390" />
      <Image
        animation={'slideInUp'}
        source={require('../image/splash_logo.png')}
        style={styles.Logo}
      />
      <Text animation={'slideInUp'} style={styles.LogoTitle}>
        Cookery Dawn
      </Text>
      <Text animation={'slideInUp'} style={styles.TagLine}>
        Filter Out Your Taste !!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fad390',
  },
  Logo: {
    width: '65%',
    height: 220,
  },
  LogoTitle: {
    fontSize: 40,
    fontWeight: '600',
    color: '#25242A',
    marginTop: 10,
  },
  TagLine: {
    position: 'absolute',
    bottom: 50,
    fontSize: 20,
    fontWeight: '600',
    color: '#25242A',
    opacity: 0.6,
  },
});

export default Splash;
