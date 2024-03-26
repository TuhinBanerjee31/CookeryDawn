/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {MEAL_FILTERS} from '../dataset/Data';
import MealCard from '../components/MealCard';
import {APP_ID, APP_KEY} from '../dataset/Key';
import TrendCard from '../components/TrendCard';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const [trendFood, setTrendFood] = useState([]);
  useEffect(() => {
    getTrendFood();
  }, []);

  // LOGIC FOR FETECH REQ FROM API
  const getTrendFood = () => {
    let myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Accept-Language', 'en');

    let requestQptions = {
      method: 'GET',
      haeders: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=food&app_id=${APP_ID}&app_key=${APP_KEY}`,
      requestQptions,
    )
      .then(response => response.json())
      .then(res => {
        console.log(res.hits);
        setTrendFood(res.hits);
      })
      .catch(error => console.log('ERROR', error));
  };

  // console.log(trendFood[0].recipe.label);

  return (
    <View style={styles.Container}>
      <StatusBar translucent backgroundColor="transparent" />

      {/* TOP BANNER-SEARCH VIEW */}
      <View style={styles.TopView}>
        <Image
          source={require('../image/topview_banner.jpg')}
          style={styles.Banner}
        />
        <Text style={styles.AppName}>Cookery Dawn</Text>
        <View style={styles.TransSheet}>
          <TouchableOpacity
            style={styles.SearchFeild}
            onPress={() => {
              navigation.navigate('Search');
            }}>
            {/* <Icon name="search" color="#000000" size={25} /> */}
            <View style={styles.SearchFeildTextBox}>
              <Text style={styles.SearchFeildText}>
                Figure Out Your Taste Here...
              </Text>
            </View>

            <View style={styles.SearchBtn}>
              <Icon name="search" color="#000000" size={25} />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.SubTitle}>
          Serves more than 1000+ taste of mouth
        </Text>
      </View>

      {/* MEALS SECTION */}
      <View style={styles.MealContainer}>
        <Text style={styles.MealContainerTitle}>Meals</Text>
        <FlatList
          horizontal
          data={MEAL_FILTERS}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Meal', {data: item.title});
                }}>
                <MealCard item={item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* TRENDING FOODS SECTION */}
      <View style={styles.TrendContainer}>
        <Text style={styles.TrendContainerTitle}>Trending</Text>
        <FlatList
          data={trendFood}
          showsVerticalScrollIndicator={false}
          style={styles.FlatListTrend}
          renderItem={({item, index}) => {
            if (index <= 11 && index !== 3) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Details', {data: item});
                  }}
                  activeOpacity={0.6}>
                  <TrendCard item={item} />
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  TopView: {
    width: '100%',
    height: '35%',
  },
  Banner: {
    width: '100%',
    height: '100%',
  },
  TransSheet: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(37, 36, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SearchFeild: {
    width: '80%',
    // borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    marginTop: 30,
    position: 'relative',
  },
  SearchFeildTextBox: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
    width: '80%',
    height: '100%',
    // position: 'absolute',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  SearchFeildText: {
    color: 'rgba(37, 36, 42, 0.5)',
  },
  SearchBtn: {
    height: '100%',
    backgroundColor: '#fad390',
    alignItems: 'center',
    width: '20%',
    justifyContent: 'center',
    position: 'absolute',
    left: '80%',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  AppName: {
    position: 'absolute',
    color: 'white',
    zIndex: 9,
    top: 60,
    marginLeft: 35,
    // marginTop: 60,
    fontSize: 35,
    fontWeight: '600',
    letterSpacing: 3,
  },
  SubTitle: {
    position: 'absolute',
    color: 'white',
    zIndex: 9,
    bottom: 85,
    textAlign: 'center',
    width: '100%',
    fontSize: 16,
    fontWeight: '400',
  },
  MealContainer: {
    width: '100%',
    // height: '100%',
  },
  MealContainerTitle: {
    color: '#25242A',
    fontSize: 23,
    fontWeight: '500',
    letterSpacing: 2,
    marginLeft: 15,
    marginTop: 18,
  },
  TrendContainer: {
    width: '100%',
  },
  TrendContainerTitle: {
    color: '#25242A',
    fontSize: 23,
    fontWeight: '500',
    letterSpacing: 2,
    marginLeft: 15,
    marginTop: 18,
  },
  FlatListTrend: {
    marginBottom: 610,
    marginHorizontal: 20,
    marginTop: 10,
  },
});
