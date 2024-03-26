/* eslint-disable prettier/prettier */
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MealCard = ({item}) => {
  return (
    <View style={styles.MealCardContainer}>
        <ImageBackground source={item.imageUrl} resizeMode="cover" style={styles.imageBG} imageStyle={{ borderRadius: 10}}>
            <View style={styles.CardFooter}>
                <Icon name={item.icon_name} style={styles.CardFooterImage} size={25} color="#fad390" />
                <Text style={styles.CardFooterText}>{item.title}</Text>
            </View>
        </ImageBackground>
    </View>
  );
};

export default MealCard;

const styles = StyleSheet.create({
    MealCardContainer: {
        width: 200,
        height: 140,
        marginHorizontal: 10,
        borderRadius: 30,
        marginVertical: 20,
    },
    imageBG: {
        width: 200,
        height: '100%',
        borderRadius: 30,
    },
    CardFooter: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        backgroundColor: 'rgba(37, 36, 42, 0.5)',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    CardFooterImage: {
        marginHorizontal: 10,
    },
    CardFooterText: {
        color: '#fad390',
        fontSize: 15,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
});
