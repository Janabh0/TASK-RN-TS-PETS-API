import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { Pet } from "./types"; // Update path if needed

const PetDetails = () => {
  const { petId } = useLocalSearchParams();
  const router = useRouter();
  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    if (!petId) return;

    axios
      .get<Pet>(
        `https://pets-react-query-backend.eapi.joincoded.com/pets/${petId}`
      )
      .then((res) => setPet(res.data))
      .catch((err) => console.error("Error fetching pet:", err));
  }, [petId]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://pets-react-query-backend.eapi.joincoded.com/pets/${petId}`
      );
      Alert.alert("Success", "Pet deleted!");
      router.back(); // Navigate back
    } catch (error) {
      Alert.alert("Error", "Failed to delete pet.");
      console.error(error);
    }
  };

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>Loading pet details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{pet.name}</Text>
      <Image source={{ uri: pet.image }} style={styles.image} />
      <Text style={styles.description}>{pet.description}</Text>
      <Text style={styles.type}>Type: {pet.type}</Text>

      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginVertical: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  type: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
