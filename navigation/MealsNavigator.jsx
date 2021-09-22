import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { CategoriesScreen } from '../screens/CategoriesScreen';
import { CategoryMealScreen } from '../screens/CategoryMealScreen';
import { MealDetailScreen } from '../screens/MealDetailScreen';
import { Colors } from '../constants/colors';
import { HeaderButton } from '../components/HeaderButton';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { FiltersScreen } from '../screens/FiltersScreen';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/actions/meals';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const defaultStackOptions = {
  headerTitleAlign: 'center',
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
};

const MealsStack = ({ navigation }) => {
  const dispatch = useDispatch();
  const { favoriteMeals } = useSelector((state) => state.meals);

  return (
    <Stack.Navigator screenOptions={defaultStackOptions}>
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'Meal Categories',
          headerLeft: () => (
            <HeaderButton onPress={() => navigation.toggleDrawer()}>
              <Ionicons
                name="ios-menu"
                color={Platform.OS === 'android' ? 'white' : Colors.primary}
                size={23}
              />
            </HeaderButton>
          ),
        }}
      />
      <Stack.Screen
        name="CategoryMeals"
        component={CategoryMealScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route }) => {
          const { title } = route.params;

          const header = title.length > 23 ? title.slice(0, 23) + '...' : title;

          return {
            title: header,
            headerRight: () => (
              <HeaderButton
                onPress={() => dispatch(toggleFavorite(route.params.mealId))}
              >
                <Ionicons
                  name={
                    favoriteMeals.some(
                      (meal) => meal.id === route.params.mealId
                    )
                      ? 'ios-star'
                      : 'ios-star-outline'
                  }
                  color={Platform.OS === 'android' ? 'white' : Colors.primary}
                  size={23}
                />
              </HeaderButton>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

const FavsStack = ({ navigation }) => {
  const dispatch = useDispatch();
  const { favoriteMeals } = useSelector((state) => state.meals);

  return (
    <Stack.Navigator screenOptions={defaultStackOptions}>
      <Stack.Screen
        name="Favs"
        component={FavoritesScreen}
        options={{
          title: 'Your Favorites',
          headerLeft: () => (
            <HeaderButton onPress={() => navigation.toggleDrawer()}>
              <Ionicons
                name="ios-menu"
                color={Platform.OS === 'android' ? 'white' : Colors.primary}
                size={23}
              />
            </HeaderButton>
          ),
        }}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route }) => {
          const { title } = route.params;

          const header = title.length > 23 ? title.slice(0, 23) + '...' : title;
          return {
            title: header,
            headerRight: () => (
              <HeaderButton
                onPress={() => dispatch(toggleFavorite(route.params.mealId))}
              >
                <Ionicons
                  name={
                    favoriteMeals.some(
                      (meal) => meal.id === route.params.mealId
                    )
                      ? 'ios-star'
                      : 'ios-star-outline'
                  }
                  color={Platform.OS === 'android' ? 'white' : Colors.primary}
                  size={23}
                />
              </HeaderButton>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

const MealsTab = () => {
  return (
    <Tab.Navigator
      activeColor="white"
      shifting={true}
      barStyle={{
        backgroundColor: Colors.primary,
      }}
    >
      <Tab.Screen
        name="Meals"
        component={MealsStack}
        options={{
          tabBarColor: Colors.primary,
          tabBarIcon: ({ color }) => (
            <Ionicons size={23} name="ios-restaurant" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons size={23} name="ios-star" color={color} />
          ),
          tabBarColor: Colors.accent,
        }}
      />
    </Tab.Navigator>
  );
};

const FiltersStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={defaultStackOptions}>
      <Stack.Screen
        name="Filters Screen"
        component={FiltersScreen}
        options={{
          title: 'Filter Meals',
          headerLeft: () => (
            <HeaderButton onPress={() => navigation.toggleDrawer()}>
              <Ionicons
                name="ios-menu"
                color={Platform.OS === 'android' ? 'white' : Colors.primary}
                size={23}
              />
            </HeaderButton>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const MealDrawer = () => {
  return (
    <Drawer.Navigator
      headerShown="false"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        },
        drawerActiveTintColor: Colors.accent,
        drawerInactiveTintColor: 'white',
      }}
    >
      <Drawer.Screen
        name="Main"
        component={MealsTab}
        options={{ title: 'Meals' }}
      />
      <Drawer.Screen name="Filters" component={FiltersStack} />
    </Drawer.Navigator>
  );
};

export const Navigator = () => {
  return (
    <NavigationContainer>
      <MealDrawer />
    </NavigationContainer>
  );
};
