import axios from "axios";
import { Pet } from "../app/types";

const BASE_URL = "https://pets-react-query-backend.eapi.joincoded.com/pets";

export const createPet = async (newPet: Omit<Pet, "id">) => {
  const response = await axios.post(BASE_URL, newPet);
  return response.data;
};

export const deletePet = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const fetchPets = async () => {
  const response = await axios.get<Pet[]>(BASE_URL);
  return response.data;
};

export const fetchPetById = async (id: number) => {
  const response = await axios.get<Pet>(`${BASE_URL}/${id}`);
  return response.data;
};
