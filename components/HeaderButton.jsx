import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

export const HeaderButton = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        {/* <Ionicons
          name="ios-star-outline"
          color={Platform.OS === 'android' ? 'white' : Colors.primary}
          size={23}
        /> */}
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
