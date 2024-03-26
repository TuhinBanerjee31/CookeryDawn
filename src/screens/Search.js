/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  FlatList,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {View, Text} from 'react-native-animatable';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import IconEntype from 'react-native-vector-icons/Entypo';
import {APP_ID, APP_KEY} from '../dataset/Key';
import SearchCard from '../components/SearchCard';
import {useNavigation} from '@react-navigation/native';
import {Keyboard} from 'react-native';
import EmptyCard from '../components/EmptyCard';
import Modal from 'react-native-modal';
import {CUISINE_FILTERS, DIET_FILTERS, HEALTH_FILTERS} from '../dataset/Data';

const Search = ({}) => {
  const navigation = useNavigation();

  const [searchItem, setSearchItem] = useState('');
  const [foodData, setFoodData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  //FILTER DATA STORING STATE
  const [dietOption, setDietOption] = useState('');
  const [healthOption, setHealthOption] = useState('');
  const [cusineOption, setCusineOption] = useState('');

  const getSearchFood = () => {
    let myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Accept-Language', 'en');

    let requestQptions = {
      method: 'GET',
      haeders: myHeaders,
      redirect: 'follow',
    };

    let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchItem}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    if (dietOption) {
      url = url + `&Diet=${dietOption}`;
    }
    if (healthOption) {
      url = url + `&Health=${healthOption}`;
    }
    if (cusineOption) {
      url = url + `&cuisineType=${cusineOption}`;
    }

    fetch(url, requestQptions)
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
      {/* SEARCH FEILD AREA */}
      <View style={styles.SearchFeild} animation={'slideInUp'}>
        <TextInput
          placeholder="Figure Out Your Taste Here..."
          placeholderTextColor="rgba(37, 36, 42, 0.5)"
          onChangeText={setSearchItem}
          value={searchItem}
          style={styles.SearchFeildText}
        />

        {searchItem.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchItem('')}
            style={{position: 'absolute', left: '70%'}}>
            <IconEntype name="cross" color="rgba(37, 36, 42, 0.5)" size={30} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.SearchBtn}
          onPress={() => {
            setFoodData([]);
            getSearchFood();
            Keyboard.dismiss();
          }}>
          <Icon name="search" color="#000000" size={30} style={{top: '25%'}} />
        </TouchableOpacity>
      </View>

      {/* SEARCH LIST OF FOOD DATA */}
      {foodData.length !== 0 ? (
        <View style={styles.SearchList}>
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

      {/* FILTER BUTTON */}
      {foodData.length !== 0 && (
        <View style={styles.FilterBtn} animation={'slideInUp'}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="filter" size={30} />
          </TouchableOpacity>
        </View>
      )}

      {/* MODAL FOR FILTERS */}
      <Modal
        isVisible={modalVisible}
        style={{margin: 0}}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}>
        <View style={styles.ModalView}>
          <View style={styles.ModalHeader}>
            <Text style={styles.ModalHeaderText}>Filters</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <IconEntype name="cross" color="#25242A" size={30} />
            </TouchableOpacity>
          </View>

          {/* DIET FILTER OPTIONS */}
          <View style={styles.FilterOptions}>
            <Text style={styles.OptionTitle}>Diet</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={DIET_FILTERS}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.OptionBox,
                      {
                        backgroundColor:
                          dietOption === item ? '#fad390' : 'transparent',
                      },
                    ]}
                    onPress={() => setDietOption(item)}>
                    <Text
                      style={[
                        styles.OptionText,
                        {color: dietOption === item ? '#FFFFFF' : '#fad390'},
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          {/* HEALTH FILTER OPTIONS */}
          <View style={styles.FilterOptions}>
            <Text style={styles.OptionTitle}>Health</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={HEALTH_FILTERS}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.OptionBox,
                      {
                        backgroundColor:
                          healthOption === item ? '#fad390' : 'transparent',
                      },
                    ]}
                    onPress={() => setHealthOption(item)}>
                    <Text
                      style={[
                        styles.OptionText,
                        {color: healthOption === item ? '#FFFFFF' : '#fad390'},
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          {/* CUSINE FILTER OPTIONS */}
          <View style={styles.FilterOptions}>
            <Text style={styles.OptionTitle}>Cuisine Type</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={CUISINE_FILTERS}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.OptionBox,
                      {
                        backgroundColor:
                          cusineOption === item ? '#fad390' : 'transparent',
                      },
                    ]}
                    onPress={() => setCusineOption(item)}>
                    <Text
                      style={[
                        styles.OptionText,
                        {color: cusineOption === item ? '#FFFFFF' : '#fad390'},
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          {/* MODAL/FILTERS BUTTONS */}
          <View style={styles.ModalButtons}>
            <TouchableOpacity
              style={styles.ClearFilterBtn}
              onPress={() => {
                setCusineOption('');
                setDietOption('');
                setHealthOption('');
              }}>
              <Text style={styles.ClearFilterText}>Clear Filter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.ApplyFilterBtn}
              onPress={() => {
                setModalVisible(false);
                getSearchFood();
              }}>
              <Text style={styles.ApplyFilterText}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'rgba(37, 36, 42, 0.1)',
  },
  SearchFeild: {
    width: '85%',
    flexDirection: 'row',
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  SearchFeildText: {
    color: '#25242A',
    backgroundColor: 'white',
    width: '80%',
    height: '100%',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  SearchBtn: {
    height: '100%',
    backgroundColor: '#fad390',
    width: '20%',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    alignItems: 'center',
  },
  SearchList: {
    top: 140,
    marginBottom: 220,
  },
  FilterBtn: {
    backgroundColor: '#fad390',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    right: 20,
    borderRadius: 500,
  },
  ModalView: {
    height: '50%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  ModalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginBottom: 25,
  },
  ModalHeaderText: {
    color: '#25242A',
    fontSize: 22,
    letterSpacing: 2,
    fontWeight: '600',
  },
  FilterOptions: {
    width: '95%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  OptionTitle: {
    color: '#25242A',
    marginBottom: 10,
    textTransform: 'uppercase',
    fontSize: 15,
    letterSpacing: 3,
  },
  OptionBox: {
    borderWidth: 2,
    borderColor: '#fad390',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 3,
    borderRadius: 5,
  },
  OptionText: {
    // color: '#fad390',
    textTransform: 'uppercase',
  },
  ModalButtons: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    alignSelf: 'center',
  },
  ClearFilterBtn: {
    borderWidth: 2,
    borderColor: '#fad390',
    width: '42%',
    paddingVertical: 8,
    borderRadius: 3,
  },
  ClearFilterText: {
    color: '#fad390',
    textAlign: 'center',
    fontSize: 18,
    letterSpacing: 2,
  },
  ApplyFilterBtn: {
    backgroundColor: '#fad390',
    width: '42%',
    paddingVertical: 8,
    borderRadius: 3,
  },
  ApplyFilterText: {
    textAlign: 'center',
    fontSize: 18,
    letterSpacing: 2,
  },
});
