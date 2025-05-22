import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

const AddPet = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

  const handleAddPet = async () => {
    if (!name || !description || !type || !image) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
      await axios.post(
        "https://pets-react-query-backend.eapi.joincoded.com/pets",
        {
          name,
          description,
          type,
          image,
          adopted: 0,
        }
      );

      Alert.alert("Success", "Pet added successfully!");

      setName("");
      setDescription("");
      setType("");
      setImage("");
    } catch (error) {
      console.error("Error adding pet:", error);
      Alert.alert("Error", "Failed to add pet.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Your Pet!</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Type"
        style={styles.input}
        value={type}
        onChangeText={setType}
      />
      <TextInput
        placeholder="Image URL"
        style={styles.input}
        value={image}
        onChangeText={setImage}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddPet}>
        <Text style={styles.buttonText}>Add Pet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddPet;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9e3be",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
