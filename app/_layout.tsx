import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { QueryProvider } from "./providers/QueryProvider";

export default function RootLayout() {
  const router = useRouter();
  return (
    <QueryProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f9e3be",
          },
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/AddPet")}>
              <MaterialIcons name="add" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen
          name="index"
          options={{
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f9e3be",
        },
        headerShadowVisible: false,
        headerRight: () => (
          <TouchableOpacity onPress={() => router.push("/AddPet")}>
            <MaterialIcons name="add" size={30} color="black" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Pet Adoption",
          headerStyle: {
            backgroundColor: "#f9e3be",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="[petId]"
        options={{
          headerTitle: "Pet Details",
          headerStyle: {
            backgroundColor: "#f9e3be",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="AddPet"
        options={{
          headerTitle: "Add Pet",
          presentation: "modal",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="close" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
