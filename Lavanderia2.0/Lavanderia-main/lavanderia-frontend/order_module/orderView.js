import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import api from '../api'; 

export default function OrderView() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders') 
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  const renderItem = ({ item }) => {
    const total = item.details.reduce((sum, detail) => sum + detail.price, 0);
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Cliente: {item.client_name}</Text>
        {item.details.map((d, i) => (
          <Text key={i} style={styles.detailText}>
            Prenda: {d.garment} - Servicio: {d.service} - ${d.price}
          </Text>
        ))}
        <Text style={styles.total}>Total: ${total}</Text>
        <Text style={styles.status}>Estado: {item.status}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resumen de Órdenes</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
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
  card: {
    backgroundColor: '#8A6E2F', 
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 7,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    color: '#FFF8E7', 
    marginBottom: 8,
  },
  detailText: {
    color: '#FFF8E7',
    fontSize: 14,
    marginBottom: 4,
  },
  total: {
    marginTop: 8,
    fontWeight: '700',
    fontSize: 16,
    color: '#F5DEB3',
  },
  status: {
    marginTop: 4,
    fontStyle: 'italic',
    color: '#FFF8E7',
  },
});
