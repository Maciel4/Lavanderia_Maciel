import { StyleSheet, Text, View, TextInput, Pressable, Alert, Platform } from 'react-native'
import { useState } from 'react';
import { API_URL } from './api';

export default function Login({ navigation }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Login correcto')
        navigation.navigate('Home')
      } else {
        Alert.alert('Error', data.msg || 'Error en login')
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar al servidor')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}></TextInput>

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}></TextInput>

      <Pressable style={styles.button} onPress={handleLogin}><Text style={styles.textButton}>Aceptar</Text></Pressable>
      <Pressable onPress={() => navigation.navigate('Crear Usuario')}><Text style={styles.textReg}>Registrate</Text></Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#946dd3',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30
  },

  label: {
    fontSize: 20
  },

  input: {
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
    fontSize: 15,
    width: "auto"
  },

  centeredButton: {
    alignItems: 'center',
    marginTop: 15
  },

  button: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 14
  },

  textButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center"
  },

  textReg: {
    marginTop: 10,
    fontSize: 15
  }

})