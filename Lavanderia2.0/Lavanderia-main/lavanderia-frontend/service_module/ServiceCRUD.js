import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet, Alert } from 'react-native';
import api from '../api';

export default function ServiceCRUD() {
  const [services, setServices] = useState([]);
  const [input, setInput] = useState('');

  const loadServices = () => {
    api.get('/services')
      .then(res => setServices(res.data))
      .catch(() => Alert.alert('Error', 'No se pudieron cargar los servicios'));
  };

  useEffect(loadServices, []);

  const addService = () => {
    if (!input.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }
    api.post('/services', { name: input })
      .then(loadServices)
      .catch(() => Alert.alert('Error', 'No se pudo agregar el servicio'));
    setInput('');
  };

  const deleteService = (id) => {
    api.delete(`/services/${id}`)
      .then(loadServices)
      .catch(() => Alert.alert('Error', 'No se pudo eliminar el servicio'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Servicios</Text>

      <TextInput
        style={styles.input}
        placeholder="Nuevo servicio"
        placeholderTextColor="#ccc"
        value={input}
        onChangeText={setInput}
      />

      <Pressable style={styles.addButton} onPress={addService}>
        <Text style={styles.addButtonText}>Agregar</Text>
      </Pressable>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Pressable style={styles.deleteButton} onPress={() => deleteService(item.id)}>
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay servicios disponibles</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A2F1B',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#F5DEB3',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#B89E4C',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 7,
  },
  addButtonText: {
    color: '#3A2F1B',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#8A6E2F',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  itemText: {
    color: '#FFF8E7',
    fontSize: 18,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#A53E3E',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#F5DEB3',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
});
