import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function DetailScreen({ route }) {
  const { exercise } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={exercise.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{exercise.name}</Text>
      <Text style={styles.desc}>{exercise.description}</Text>
      <Text style={styles.meta}>Status: {exercise.completed ? 'Completed' : 'Not completed'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems:'center', backgroundColor:'#fff' },
  image: { width: 250, height: 200, marginBottom: 20, borderRadius:12 },
  title: { fontSize:20, fontWeight:'700', marginBottom:12 },
  desc: { fontSize:16, lineHeight:22, textAlign:'center' },
  meta: { marginTop:16, fontStyle:'italic' }
});
