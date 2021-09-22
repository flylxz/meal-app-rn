import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { MealItem } from './MealItem';

export const MealList = ({ data, navigation }) => {
  const renderMealItem = (item) => {
    return (
      <MealItem
        item={item}
        onSelectMeal={() =>
          navigation.navigate('MealDetail', {
            title: item.title,
            mealId: item.id,
          })
        }
      />
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={data}
        renderItem={({ item }) => renderMealItem(item)}
        keyExtractor={(item) => item.id}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
});
