/* eslint-disable prettier/prettier */
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';

const width = Dimensions.get('window').width;

const TrendCard = ({item}) => {

  return (
    <View style={styles.TrendCardContainer}>
      <ImageBackground
        source={{uri: item.recipe.image}}
        resizeMode="cover"
        style={styles.imageBG}
        imageStyle={{borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}
      />
      <View style={styles.ContentContainer}>
        <View style={styles.Labels}>
          {item.recipe.healthLabels.map((label, index) => {
            if (index < 6) {
              return (
                <View style={styles.LabelBox}>
                  <Text style={styles.LabelText}>{label}</Text>
                </View>
              );
            }
          })}
        </View>
        <Text style={styles.ImageText}>{item.recipe.label}</Text>
      </View>
    </View>
  );
};

export default TrendCard;

const styles = StyleSheet.create({
  TrendCardContainer: {
    width: width - 50,
    height: 200,
    marginVertical: 10,
    flexDirection: 'row',
    position: 'relative',
    elevation: 5,
  },
  imageBG: {
    height: '100%',
    width: '70%',
    position: 'absolute',
  },
  ContentContainer: {
    height: '100%',
    width: '53%',
    position: 'absolute',
    left: '49%',
    backgroundColor: '#FFFFFF',
    // elevation: 2,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
  ImageText: {
    width: '97%',
    color: '#25242A',
    bottom: 5,
    position: 'absolute',
    letterSpacing: 2,
    fontWeight: '400',
    // marginLeft: 1,
    textAlign: 'center',
  },
  Labels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginHorizontal: 5,
  },
  LabelBox: {
    borderWidth: 2,
    borderColor: '#fad390',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
    margin: 1,
  },
  LabelText: {
    color: '#fad390',
    fontSize: 10,
    // letterSpacing: 2,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
