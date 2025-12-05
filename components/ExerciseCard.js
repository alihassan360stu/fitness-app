import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function ExerciseCard({ exercise, onToggle }) {
  return (
    <View style={styles.card}>
      <Image source={exercise.image} style={styles.image} />
      <View style={{ flex: 1, paddingHorizontal: 12 }}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text numberOfLines={2} style={styles.desc}>{exercise.description}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
          <Text style={[styles.status, exercise.completed && { color: 'green' }]}>{exercise.completed ? 'Completed' : 'Pending'}</Text>
          <TouchableOpacity onPress={onToggle}><Text style={styles.toggle}>{exercise.completed ? 'Undo' : 'Mark Done'}</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#f9f9f9', padding: 12, borderRadius: 12, alignItems: 'center', elevation: 2 },
  image: { width: 70, height: 70, borderRadius: 8 },
  name: { fontWeight: '700', fontSize: 16 },
  desc: { color: '#555' },
  status: { fontWeight: '600' },
  toggle: { color: '#007AFF' }
});
