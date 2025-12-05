import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function DetailScreen({ route }) {
  const { exercise } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image 
          source={exercise.image} 
          style={styles.image} 
          resizeMode="contain"  
        />

        <Text style={styles.title}>{exercise.name}</Text>

        <Text style={styles.desc}>{exercise.description}</Text>

        <View style={[styles.statusBox, exercise.completed ? styles.done : styles.pending]}>
          <Text style={styles.statusText}>
            {exercise.completed ? "✔ Completed" : "Not Completed"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    alignItems: 'center', 
    backgroundColor: '#F3F6FC', 
    flexGrow: 1 
  },

  card: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 22,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },

  image: { 
    width: "100%", 
    height: 300,        
    borderRadius: 16, 
    marginBottom: 20, 
    backgroundColor: "#E2E8F0"
  },

  title: { 
    fontSize: 26, 
    fontWeight: '800', 
    marginBottom: 10,
    textAlign: 'center',
    color: "#1E3A8A"
  },

  desc: { 
    fontSize: 16, 
    lineHeight: 24, 
    textAlign: 'center', 
    marginBottom: 14,
    color: "#475569"
  },

  statusBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
  },

  statusText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff"
  },

  done: {
    backgroundColor: "#10B981"  
  },

  pending: {
    backgroundColor: "#F59E0B" 
  }
});
