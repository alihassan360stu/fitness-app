import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExerciseCard from '../components/ExerciseCard';

const STORAGE_KEY = '@exercises_v1';

const SAMPLE = [
  { id: '1', name: 'Push Ups', description: 'Do 3 sets of 12-15 push ups.', image: require('../assets/pushups.png'), completed: false },
  { id: '2', name: 'Squats', description: '3 sets of 15 squats.', image: require('../assets/squats.png'), completed: false },
  { id: '3', name: 'Plank', description: 'Hold for 60 seconds. Repeat 3 times.', image: require('../assets/plank.png'), completed: false }
];

export default function HomeScreen({ navigation }) {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setExercises(JSON.parse(stored));
      else {
        setExercises(SAMPLE);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE));
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(exercises));
  }, [exercises]);

  const toggleComplete = (id) => {
    setExercises(prev => prev.map(e => e.id === id ? { ...e, completed: !e.completed } : e));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detail', { exercise: item })}>
            <ExerciseCard exercise={item} onToggle={() => toggleComplete(item.id)} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{height:12}} />}
        contentContainerStyle={{padding:16}}
      />
      <View style={styles.addButton}>
        <Button title="Add Exercise" onPress={() => navigation.navigate('AddExercise', { onAdd: (newEx) => setExercises(prev => [newEx, ...prev]) })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#fff' },
  addButton: { padding: 16 }
});
