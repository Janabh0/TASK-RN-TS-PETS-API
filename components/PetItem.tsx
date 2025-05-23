import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePet } from "../api/pets";
import { Pet } from "../app/types";

interface PetItemProps {
  pet: Pet;
}

const PetItem = ({ pet }: PetItemProps) => {
  const [image, setImage] = useState(pet.image);
  const queryClient = useQueryClient();

  const { mutate: handleDelete, isLoading } = useMutation({
    mutationFn: deletePet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      Alert.alert("Success", "Pet adopted successfully!");
    },
    onError: (error) => {
      console.error("Error adopting pet:", error);
      Alert.alert("Error", "Failed to adopt pet.");
    },
  });

  return (
    <Link href={`/${pet.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.petInfo}>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.name}>{pet.name}</Text>
          <Text style={styles.description}>{pet.description}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.petButton}
            onPress={() => setImage(pet.image2)}
          >
            <Text style={styles.buttonText}>Pet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.adoptButton, isLoading && styles.buttonDisabled]}
            onPress={() => handleDelete(pet.id)}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Adopting..." : "Adopt"}
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Link>
  );
};

export default PetItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#f9e3be",
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  petInfo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    textAlign: "center",
    color: "purple",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "black",
    fontWeight: "light",
  },
  type: {
    fontSize: 18,
    fontWeight: "semibold",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  petButton: {
    backgroundColor: "#4ade80",
    padding: 10,
    borderRadius: 10,
    width: "50%",
    marginBottom: 10,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  adoptButton: {
    backgroundColor: "#f43f5e",
    padding: 10,
    borderRadius: 10,
    width: "50%",
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#999",
  },
});
