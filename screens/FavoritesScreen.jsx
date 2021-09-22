import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { DefaultText } from '../components/DefaultText';

import { MealList } from '../components/MealList';

export const FavoritesScreen = ({ navigation }) => {
  const { favoriteMeals } = useSelector((state) => state.meals);
  console.log(favoriteMeals.length);
  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.screen}>
        <DefaultText>It's Empty!</DefaultText>
      </View>
    );
  }

  return <MealList data={favoriteMeals} navigation={navigation} />;
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
