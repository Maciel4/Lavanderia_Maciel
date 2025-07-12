import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useState } from 'react';
import { API_URL } from '../api';
import { useNavigation } from '@react-navigation/native';

export default function CreateClient() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigation = useNavigation();

  const handleCreate = async () => {
    if (!name || !address || !phoneNumber) {
      Alert.alert('⚠️ Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/clients/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          address,
          phone_number: phoneNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('❌ Error', data.error || 'No se pudo crear el cliente');
        return;
      }

      Alert.alert('✅ Cliente creado', `ID: ${data.client.id}`);
      setName('');
      setAddress('');
      setPhoneNumber('');
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Volver</Text>
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.title}>Crea un nuevo cliente</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#8A6E2F"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          placeholder="Dirección"
          placeholderTextColor="#8A6E2F"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Número de teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          placeholderTextColor="#8A6E2F"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <View style={styles.centeredButton}>
          <Pressable style={styles.button} onPress={handleCreate}>
            <Text style={styles.textButton}>Crear</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A2F1B', 
    padding: 20,
  },
  content: {
    marginTop: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F5DEB3', 
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  label: {
    fontSize: 18,
    color: '#F5DEB3',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#8A6E2F', 
    backgroundColor: '#FFF8E7',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#3A2F1B',
    marginBottom: 20,
  },
  centeredButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#8A6E2F',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 6,
  },
  textButton: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    backgroundColor: '#F5DEB3',
    borderRadius: 8,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3A2F1B',
    fontWeight: '700',
  },
});
