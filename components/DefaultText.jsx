import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const DefaultText = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans',
  },
});
