import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function Home({ navigation }) {
  const buttons = [
    { title: "Crear Cliente", icon: "user-plus", route: "CrearCliente" },
    { title: "Actualizar Cliente", icon: "user-edit", route: "ActualizarCliente" },
    { title: "Eliminar Cliente", icon: "user-times", route: "EliminarCliente" },
    { title: "Buscar Cliente", icon: "search", route: "BuscarCliente" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gestión de Clientes</Text>

      <View style={styles.buttonsContainer}>
        {buttons.map(({ title, icon, route }) => (
          <Pressable
            key={route}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => navigation.navigate(route)}
          >
            <FontAwesome5 name={icon} size={20} color="#FFF" style={styles.icon} />
            <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A2F1B", 
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: "#F5DEB3",
    marginBottom: 40,
    fontWeight: "700",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  buttonsContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: "#8A6E2F", 
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 7, // para Android
  },
  buttonPressed: {
    backgroundColor: "#B89E4C", 
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.9,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1.2,
  },
  icon: {
    marginRight: 15,
  },
});
