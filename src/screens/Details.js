/* eslint-disable prettier/prettier */
import {StyleSheet, Text, Dimensions} from 'react-native';
import {View, Image} from 'react-native-animatable';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const width = Dimensions.get('window').width;

const Details = () => {
  const route = useRoute();
  return (
    <View style={styles.DetailsContainer}>
      <Image
        source={{uri: route.params.data.recipe.image}}
        style={styles.DetailsImage}
        animation={'slideInDown'}
      />
      <View style={styles.DetailsPad} animation={'slideInUp'}>
        <View style={styles.BasicDetails}>

          <Text style={styles.Title}>{route.params.data.recipe.label}</Text>

          <View style={styles.BasicLabels}>
            <Text style={styles.Label}>
              kCal-{' '}
              <Text style={styles.LabelText}>
                {Number(route.params.data.recipe.calories).toFixed(2)}
              </Text>
            </Text>
            <Text style={styles.Label}>
              CO2-{' '}
              <Text style={styles.LabelText}>
                {Number(route.params.data.recipe.totalCO2Emissions).toFixed(2)}g
              </Text>
            </Text>
            <Text style={styles.Label}>
              Fat-{' '}
              <Text style={styles.LabelText}>
                {Number(
                  route.params.data.recipe.totalNutrients.FAT.quantity,
                ).toFixed(2)}
                g
              </Text>
            </Text>
          </View>

          <View style={styles.PrepareInfo}>
            <Text style={styles.PrepareInfoTitle}>Preparation Tips</Text>
            <View style={styles.PrepareInfoTextContainer}>
              {route.params.data.recipe.ingredientLines.map(line => {
                return <Text style={styles.PrepareInfoText}>{line}</Text>;
              })}
            </View>
          </View>

          <View style={styles.HealthLabels}>
            <Text style={styles.HealthLabelsTitle}>Health Labels</Text>

            <View style={styles.HealthLabelsContainer}>
              {route.params.data.recipe.healthLabels.map((label, index) => {
                if (route.params.data.recipe.ingredientLines.length <= 9 && index < 15) {
                  return (
                    <View style={styles.HealthLabelBox}>
                      <Text style={styles.HealthLabelText}>{label}</Text>
                    </View>
                  );
                }
                else if (route.params.data.recipe.ingredientLines.length > 9 && index <= 2) {
                  return (
                    <View style={styles.HealthLabelBox}>
                      <Text style={styles.HealthLabelText}>{label}</Text>
                    </View>
                  );
                }
              })}
            </View>
          </View>

        </View>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  DetailsContainer: {
    flex: 1,
    backgroundColor: '#fad390',
  },
  DetailsImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    zIndex: 9,
    borderRadius: 500,
    top: 110,
    alignSelf: 'center',
  },
  DetailsPad: {
    width: width - 10,
    height: '70%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    zIndex: 8,
  },
  BasicDetails: {
    width: '100%',
    position: 'absolute',
    // alignSelf: 'center',
  },
  Title: {
    color: '#25242A',
    fontSize: 22,
    textAlign: 'center',
    alignSelf: 'center',
    top: 100,
    fontWeight: '500',
    letterSpacing: 2,
    width: '85%',
  },
  BasicLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 120,
    width: '85%',
    alignSelf: 'center',
  },
  Label: {
    color: '#fad390',
    fontWeight: '500',
    letterSpacing: 1,
  },
  LabelText: {
    fontWeight: '200',
    letterSpacing: 2,
  },
  PrepareInfo: {
    top: 150,
    width: '90%',
    alignSelf: 'center',
  },
  PrepareInfoTitle: {
    color: '#25242A',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 5,
  },
  PrepareInfoTextContainer: {
    paddingVertical: 10,
    rowGap: 3,
    backgroundColor: 'rgba(250, 211, 144, 0.3)',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  PrepareInfoText: {
    color: '#25242A',
    fontSize: 13,
    letterSpacing: 1,
  },
  HealthLabels: {
    top: 165,
    width: '90%',
    alignSelf: 'center',
  },
  HealthLabelsTitle: {
    color: '#25242A',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 5,
  },
  HealthLabelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginVertical: 5,
  },
  HealthLabelBox: {
    borderWidth: 1,
    borderColor: '#fad390',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 15,
  },
  HealthLabelText: {
    color: '#fad390',
  },
});
