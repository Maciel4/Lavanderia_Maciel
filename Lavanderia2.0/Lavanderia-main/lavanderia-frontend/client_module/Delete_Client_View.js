import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useState } from 'react';
import { API_URL } from '../api';
import { useNavigation } from '@react-navigation/native';

export default function DeleteClient() {
  const [clientId, setClientId] = useState('');
  const navigation = useNavigation();

  const handleDelete = async () => {
    if (!clientId) {
      Alert.alert('⚠️ Error', 'Debes ingresar un ID válido');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/clients/delete/${clientId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('❌ Error', data.error || 'No se pudo eliminar el cliente');
        return;
      }

      Alert.alert('✅ Cliente eliminado', data.msg || 'Cliente eliminado');
      navigation.navigate('Home');
      setClientId('');
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Volver</Text>
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.title}>Eliminar Cliente</Text>
        <Text style={styles.label}>Ingresa el ID del cliente a eliminar</Text>
        <TextInput
          style={styles.input}
          placeholder="ID del cliente"
          placeholderTextColor="#8A6E2F"
          value={clientId}
          onChangeText={setClientId}
          keyboardType="numeric"
        />

        <View style={styles.centeredButton}>
          <Pressable style={styles.button} onPress={handleDelete}>
            <Text style={styles.textButton}>Aceptar</Text>
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
  },
  centeredButton: {
    marginTop: 20,
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
