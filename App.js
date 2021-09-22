import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { enableScreens } from 'react-native-screens';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { Navigator } from './navigation/MealsNavigator';
import { mealsReducer } from './store/reducers/meals';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default function App() {
  const [loaded, error] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (error) {
    console.warn('fonts error: ', error);
  }

  if (!loaded) {
    return <ActivityIndicator />;
  }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
