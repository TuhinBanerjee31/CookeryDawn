/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {APP_ID, APP_KEY} from '../dataset/Key';
import SearchCard from '../components/SearchCard';
import {useNavigation} from '@react-navigation/native';
import EmptyCard from '../components/EmptyCard';

const Meal = () => {
  const route = useRoute();
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    getSearchFood();
  }, []);

  const navigation = useNavigation();

  const getSearchFood = () => {
    let myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Accept-Language', 'en');

    let requestQptions = {
      method: 'GET',
      haeders: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=food&app_id=${APP_ID}&app_key=${APP_KEY}&mealType=${route.params.data}`,
      requestQptions,
    )
      .then(response => response.json())
      .then(res => {
        console.log(res.hits);
        setFoodData(res.hits);
      })
      .catch(error => console.log('ERROR', error));
  };

  return (
    <View style={styles.Container}>
      <StatusBar barStyle={'dark-content'} />
      <Text style={styles.MealTitle}>{route.params.data}</Text>

      {foodData.length != 0 ? (
        <View style={styles.MealList}>
          <FlatList
            data={foodData}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Details', {data: item});
                  }}
                  activeOpacity={0.6}
                  style={{marginBottom: 10}}>
                  <SearchCard item={item} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <EmptyCard />
      )}
    </View>
  );
};

export default Meal;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'rgba(37, 36, 42, 0.1)',
  },
  MealTitle: {
    top: 100,
    color: '#25242A',
    textTransform: 'uppercase',
    fontSize: 22,
    letterSpacing: 2,
    fontWeight: '600',
    marginLeft: 20,
  },
  MealList: {
    top: 130,
    marginBottom: 180,
  },
});
