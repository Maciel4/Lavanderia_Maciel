import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
export default function CreateOrder() {
  const [clients, setClients] = useState([]);
  const [garments, setGarments] = useState([]);
  const [services, setServices] = useState([]);

  const [selectedClient, setSelectedClient] = useState('');
  const [selectedGarment, setSelectedGarment] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    api.get('/clients').then(res => setClients(res.data));
    api.get('/garments').then(res => setGarments(res.data));
    api.get('/services').then(res => setServices(res.data));
  }, []);

  const createOrder = () => {
    if (!selectedClient || !selectedGarment || !selectedService || !price) {
      return Alert.alert('Error', 'Completa todos los campos');
    }

    const orderData = {
      client_id: selectedClient,
      details: [{
        garment_id: selectedGarment,
        service_id: selectedService,
        price: parseFloat(price),
      }],
    };

    api.post('/orders', orderData)
      .then(() => {
        Alert.alert('Éxito', 'Orden creada exitosamente');
        setSelectedClient('');
        setSelectedGarment('');
        setSelectedService('');
        setPrice('');
      })
      .catch(err => {
        console.error(err);
        Alert.alert('Error', 'No se pudo crear la orden');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crear Orden</Text>

      <Text style={styles.label}>Cliente:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedClient}
          onValueChange={setSelectedClient}
          style={styles.picker}
          dropdownIconColor="#B89E4C"
        >
          <Picker.Item label="Selecciona un cliente" value="" />
          {clients.map(c => (
            <Picker.Item key={c.id} label={c.name} value={c.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Prenda:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedGarment}
          onValueChange={setSelectedGarment}
          style={styles.picker}
          dropdownIconColor="#B89E4C"
        >
          <Picker.Item label="Selecciona una prenda" value="" />
          {garments.map(g => (
            <Picker.Item key={g.id} label={g.name} value={g.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Servicio:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedService}
          onValueChange={setSelectedService}
          style={styles.picker}
          dropdownIconColor="#B89E4C"
        >
          <Picker.Item label="Selecciona un servicio" value="" />
          {services.map(s => (
            <Picker.Item key={s.id} label={s.name} value={s.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Precio:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Precio"
        placeholderTextColor="#ccc"
        value={price}
        onChangeText={setPrice}
      />

      <Pressable style={styles.button} onPress={createOrder}>
        <Text style={styles.buttonText}>Crear Orden</Text>
      </Pressable>
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
  label: {
    color: '#F5DEB3',
    fontSize: 18,
    marginBottom: 6,
    fontWeight: '600',
  },
  pickerWrapper: {
    backgroundColor: '#8A6E2F',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    color: '#FFF8E7',
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#B89E4C',
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 7,
  },
  buttonText: {
    color: '#3A2F1B',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
