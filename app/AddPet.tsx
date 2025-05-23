import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { createPet } from "../api/pets";
import type { AxiosError } from "axios";
import { Pet } from "./types";

interface NewPet {
  name: string;
  description: string;
  type: string;
  image: string;
  image2: string;
  adopted: number;
}

const AddPet = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: NewPet) => createPet(data),
    onSuccess: () => {
      Alert.alert("Success", "Pet added successfully!", [
        {
          text: "OK",
          onPress: () => {
            setName("");
            setDescription("");
            setType("");
            setImage("");
            router.back();
          },
        },
      ]);
    },
    onError: (error: AxiosError) => {
      console.error("Error adding pet:", error);
      Alert.alert("Error", "Failed to add pet.");
    },
  });

  const handleAddPet = () => {
    if (!name || !description || !type || !image) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    mutation.mutate({
      name,
      description,
      type,
      image,
      image2: image,
      adopted: 0,
    });
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

      <TouchableOpacity
        style={[styles.button, mutation.isPending && styles.buttonDisabled]}
        onPress={handleAddPet}
        disabled={mutation.isPending}
      >
        <Text style={styles.buttonText}>
          {mutation.isPending ? "Adding..." : "Add Pet"}
        </Text>
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
  buttonDisabled: {
    backgroundColor: "#666",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
