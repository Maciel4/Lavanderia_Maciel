import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useState } from 'react';
import { API_URL } from '../api';
import { useNavigation } from '@react-navigation/native';

export default function SearchClient() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [results, setResults] = useState([]);

  const navigation = useNavigation();

  const handleSearch = async () => {
    try {
      let url = '';
      if (name) {
        url = `${API_URL}/clients/search/name?name=${encodeURIComponent(name)}`;
      } else if (phone) {
        url = `${API_URL}/clients/search/phone?phone=${encodeURIComponent(phone)}`;
      } else {
        Alert.alert('⚠️ Error', 'Ingresa un nombre o un número de teléfono');
        return;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        Alert.alert('❌ No encontrado', data.error || 'Error al buscar cliente');
        return;
      }

      setResults(Array.isArray(data) ? data : [data]);
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>← Volver</Text>
      </Pressable>

      <Text style={styles.title}>🔍 Buscar Cliente</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese un nombre"
        placeholderTextColor="#8A6E2F"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese un número"
        placeholderTextColor="#8A6E2F"
        value={phone}
        onChangeText={setPhone}
      />

      <View style={styles.centeredButton}>
        <Pressable style={styles.button} onPress={handleSearch}>
          <Text style={styles.textButton}>Buscar</Text>
        </Pressable>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>👤 Nombre: {item.name}</Text>
            <Text style={styles.resultText}>📞 Teléfono: {item.phone_number}</Text>
            <Text style={styles.resultText}>🏠 Dirección: {item.address}</Text>

            <Pressable
              style={styles.updateButton}
              onPress={() => navigation.navigate('ActualizarCliente', { client: item })}
            >
              <Text style={styles.updateButtonText}>✏️ Editar</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A2F1B', // Retro oscuro
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#F5DEB3', // Trigo
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    color: '#F5DEB3',
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#8A6E2F', 
    backgroundColor: '#FFF8E7', 
    fontSize: 16,
    padding: 10,
    color: '#3A2F1B',
    marginTop: 5,
  },
  centeredButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#8A6E2F',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  textButton: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  resultItem: {
    backgroundColor: '#F5DEB3',
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  resultText: {
    color: '#3A2F1B',
    fontSize: 16,
    marginBottom: 5,
  },
  updateButton: {
    marginTop: 10,
    backgroundColor: '#8A6E2F',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
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
    fontWeight: 'bold',
  },
});
