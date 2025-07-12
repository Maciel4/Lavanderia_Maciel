import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function UpdateClient() {
  const route = useRoute();
  const navigation = useNavigation();
  const { client } = route.params || {}; 

  if (!client) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#8A6E2F" />
        <Text style={styles.title}>Cargando cliente...</Text>
      </SafeAreaView>
    );
  }

  const [name, setName] = useState(client.name);
  const [address, setAddress] = useState(client.address);
  const [phone, setPhone] = useState(client.phone_number);

  const handleUpdate = async () => {
    if (!name || !address || !phone) {
      Alert.alert("⚠️ Error", "Por favor llena todos los campos");
      return;
    }

    try {
      await axios.put(
        `https://3p175n7f-5000.usw3.devtunnels.ms/clients/update/${client.id}`,
        {
          name,
          address,
          phone_number: phone,
        }
      );

      Alert.alert("✅ Éxito", "Cliente actualizado correctamente");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("❌ Error", "No se pudo actualizar el cliente");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>✏️ Editar Cliente</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Dirección</Text>
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Pressable style={styles.button} onPress={handleUpdate}>
        <Text style={styles.textButton}>💾 Guardar Cambios</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A2F1B", 
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#F5DEB3", 
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    color: "#F5DEB3",
  },
  input: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#8A6E2F",
    backgroundColor: "#FFF8E7",
    fontSize: 16,
    padding: 10,
    marginTop: 5,
    color: "#3A2F1B",
  },
  button: {
    backgroundColor: "#8A6E2F", 
    paddingVertical: 15,
    marginTop: 30,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, //
  },
  textButton: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});
