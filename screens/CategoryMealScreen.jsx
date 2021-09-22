import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { DefaultText } from '../components/DefaultText';

import { MealList } from '../components/MealList';
import { CATEGORIES } from '../data/dummy-data';

export const CategoryMealScreen = ({ navigation, route }) => {
  const { filteredMeals } = useSelector((state) => state.meals);
  const { mealId } = route.params;
  const selectedCategory = CATEGORIES.find((cat) => cat.id === mealId);

  const displayedMeal = filteredMeals.filter((meal) =>
    meal.categoryIds.includes(selectedCategory.id)
  );

  if (!displayedMeal.length) {
    return (
      <View style={styles.screen}>
        <DefaultText>It's Empty!</DefaultText>
      </View>
    );
  }

  return <MealList data={displayedMeal} navigation={navigation} />;
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
