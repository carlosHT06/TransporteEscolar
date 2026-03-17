import React, { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"

type LoginScreenProps = {
  onLogin: (email: string, password: string) => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mini Uber Escolar</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Iniciar sesión" onPress={() => onLogin(email, password)} />

      <Text style={styles.info}>Padre: padre@gmail.com / 1234</Text>
      <Text style={styles.info}>Conductor: driver@gmail.com / 1234</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
  },
  info: {
    marginTop: 10,
    textAlign: "center",
  },
})