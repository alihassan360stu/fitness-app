import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import AddExerciseScreen from '../screens/AddExerciseScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Exercises' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Exercise Details' }} />
      <Stack.Screen name="AddExercise" component={AddExerciseScreen} options={{ title: 'Add Exercise' }} />
    </Stack.Navigator>
  );
}
