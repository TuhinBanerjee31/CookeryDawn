/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { Image } from 'react-native-animatable';

const SearchCard = ({item}) => {
  return (
    <View style={styles.Container}>
      <Image source={{uri: item.recipe.image}} style={styles.ImageStyles} />
      <View style={styles.TextContainer}>
        <Text style={styles.LabelText}>{item.recipe.label.length > 40 ? item.recipe.label.substring(0, 40) + '....' : item.recipe.label}</Text>
        <Text style={styles.SourceText}>{item.recipe.source}</Text>
      </View>
    </View>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
    Container: {
        width: '95%',
        height: 120,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        paddingHorizontal: 5,
        columnGap: 10,
    },
    ImageStyles: {
        height: '90%',
        width: 120,
        borderRadius: 10,
        alignSelf: 'center',
    },
    TextContainer: {
        width: '65%',
        // marginTop: 15,
        justifyContent: 'space-around',
    },
    LabelText: {
        color: '#25242A',
        fontSize: 15,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    SourceText: {
        color: '#fad390',
        alignSelf: 'flex-end',
        letterSpacing: 2,
    },
});
