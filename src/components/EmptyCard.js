/* eslint-disable prettier/prettier */
import {StyleSheet, Text} from 'react-native';
import {View, Image} from 'react-native-animatable';
import React from 'react';

const EmptyCard = () => {
  return (
    <View style={styles.EmptyPad} animation={'slideInLeft'}>
      <Image
        source={require('../image/cooking.png')}
        style={{alignSelf: 'center', height: 330, width: 390}}
      />
      <Text style={styles.EmptyTitle}>Cooking....</Text>
    </View>
  );
};

export default EmptyCard;

const styles = StyleSheet.create({
  EmptyPad: {
    position: 'absolute',
    width: '100%',
    top: 300,
  },
  EmptyTitle: {
    color: '#25242A',
    alignSelf: 'center',
    fontSize: 35,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
});
