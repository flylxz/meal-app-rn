import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { CategoryGridTitle } from '../components/CategoryGridTitle';

import { CATEGORIES } from '../data/dummy-data';

export const CategoriesScreen = ({ navigation }) => {
  return (
    <FlatList
      numColumns={2}
      data={CATEGORIES}
      renderItem={({ item }) => (
        <CategoryGridTitle item={item} navigation={navigation} />
      )}
      keyExtractor={(item, idx) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
