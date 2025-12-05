import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';

export default function AddExerciseScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pickedImage, setPickedImage] = useState(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Denied', 'Allow gallery access to upload an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.cancelled) {
      setPickedImage(result.uri);
    }
  };

  const onSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Please enter a name for the exercise.');
      return;
    }

    const newExercise = {
      id: uuidv4(),
      name,
      description: description || 'No description provided.',
      image: pickedImage ? { uri: pickedImage } : require('../assets/custom.png'),
      completed: false
    };

    if (route.params && typeof route.params.onAdd === 'function') {
      route.params.onAdd(newExercise);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Exercise</Text>

      <View style={styles.card}>
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {pickedImage ? (
            <Image 
              source={{ uri: pickedImage }} 
              style={styles.preview} 
              resizeMode="contain" 
            />
          ) : (
            <Text style={styles.pickText}>Tap to Upload Image</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Exercise Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Jumping Jacks"
          placeholderTextColor="#94A3B8"
        />

        <Text style={styles.label}>Short Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the exercise"
          placeholderTextColor="#94A3B8"
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Create Exercise</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F3F6FC' },

  header: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E3A8A",
    marginBottom: 20,
    textAlign: "center"
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6
  },

  imagePicker: {
    height: 250,            
    width: '100%',
    backgroundColor: "#E2E8F0",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    overflow: 'hidden',
  },

  pickText: {
    color: "#475569",
    fontSize: 16,
    fontWeight: "600"
  },

  preview: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },

  label: {
    fontWeight: '700',
    fontSize: 16,
    color: "#334155",
    marginTop: 14
  },

  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    fontSize: 16,
    backgroundColor: "#F8FAFC",
    color: "#1E293B"
  },

  textArea: {
    height: 110,
    textAlignVertical: "top"
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 22,
    alignItems: "center"
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff"
  }
});
