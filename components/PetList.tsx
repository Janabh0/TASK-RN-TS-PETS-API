// PetList.tsx

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PetItem from "./PetItem";
import { Pet } from "../app/types"; // Ensure Pet type is correctly imported

function PetList() {
  const [search, setSearch] = useState<string>(""); // specify the state type explicitly
  const [type, setType] = useState<string>(""); // specify the state type explicitly
  const [displayPets, setDisplayPets] = useState<Pet[]>([]); // use Pet[] type for pet list

  // Fetch pets data when component mounts
  useEffect(() => {
    axios
      .get<Pet[]>("https://pets-react-query-backend.eapi.joincoded.com/pets") // Axios get with correct type
      .then((res) => setDisplayPets(res.data)) // set the fetched data in state
      .catch((err) => console.error("Error fetching pets:", err)); // Log errors if any
  }, []);

  // Filter the pet list based on search text and type
  const petList = displayPets
    .filter((pet) => pet.name.toLowerCase().includes(search.toLowerCase())) // Search by name
    .filter((pet) => pet.type.toLowerCase().includes(type.toLowerCase())) // Filter by type
    .map((pet) => (
      <PetItem
        key={pet.id}
        pet={pet}
        setDisplayPets={function (pets: any[]): void {
          throw new Error("Function not implemented.");
        }}
        displayPets={[]}
      /> // Pass each pet to PetItem component
    ));

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.containerStyle}
    >
      {/* Search Input */}
      <TextInput
        placeholder="Search for a pet"
        style={styles.searchInput}
        onChangeText={(value) => setSearch(value)} // Update search state
      />

      {/* Filter by pet type */}
      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("")}
        >
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Cat")}
        >
          <Text>Cat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Dog")}
        >
          <Text>Dog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Rabbit")}
        >
          <Text>Rabbit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Render the pet list */}
      {petList}
    </ScrollView>
  );
}

export default PetList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "#f9e3be",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
