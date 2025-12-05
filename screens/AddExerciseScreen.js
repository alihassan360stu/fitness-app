import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

export default function AddExerciseScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Please enter a name for the exercise.');
      return;
    }
    const newExercise = {
      id: uuidv4(),
      name,
      description: description || 'No description provided.',
      image: require('../assets/custom.png'),
      completed: false
    };
    // call callback passed via navigation params
    if (route.params && typeof route.params.onAdd === 'function') {
      route.params.onAdd(newExercise);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Exercise Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Jumping Jacks" />
      <Text style={styles.label}>Short Description</Text>
      <TextInput style={[styles.input, {height:100}]} value={description} onChangeText={setDescription} placeholder="Describe the exercise" multiline />
      <View style={{marginTop:20}}>
        <Button title="Create Exercise" onPress={onSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, backgroundColor:'#fff' },
  label: { fontWeight:'600', marginTop:12 },
  input: { borderWidth:1, borderColor:'#ddd', borderRadius:8, padding:10, marginTop:8 }
});
