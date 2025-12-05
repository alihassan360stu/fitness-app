import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExerciseCard from '../components/ExerciseCard';

const STORAGE_KEY = '@exercises_v1';

const SAMPLE = [
  { id: '1', name: 'Push Ups', description: 'Do 3 sets of 12-15 push ups.', image: require('../assets/pushups.jpg'), completed: false },
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
      <View style={styles.header}>
        <Text style={styles.title}>🏋️‍♂️ Fitness Tracker</Text>
        <Text style={styles.subtitle}>Track your daily exercises</Text>
      </View>

      <FlatList
        data={exercises}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('Detail', { exercise: item })}
            activeOpacity={0.8}
          >
            <ExerciseCard 
              exercise={item} 
              onToggle={() => toggleComplete(item.id)} 
            />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 150 }} // enough bottom padding
      />

      {/* Footer buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('AddExercise', { onAdd: (newEx) => setExercises(prev => [newEx, ...prev]) })}>
          <Text style={styles.footerButtonText}>Add Exercise</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.footerButton, {backgroundColor:'#10B981'}]} onPress={() => navigation.navigate('MotivationalQuotes')}>
          <Text style={styles.footerButtonText}>Motivational Quotes</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#F2F7FB' },

  header: {
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },

  title: { fontSize:28, fontWeight:'700', textAlign:'center', color:'#1E3A8A' },
  subtitle: { fontSize:16, textAlign:'center', color:'#555', marginTop:4 },

  footer: {
    position:'absolute',
    bottom:0,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    paddingVertical:12,
    backgroundColor:'#fff',
    borderTopWidth:1,
    borderColor:'#ddd',
    elevation:5,
  },

  footerButton: {
    flex:1,
    marginHorizontal:8,
    backgroundColor:'#1E88E5',
    paddingVertical:14,
    borderRadius:12,
    alignItems:'center'
  },

  footerButtonText: { color:'#fff', fontWeight:'700', fontSize:16 }
});
