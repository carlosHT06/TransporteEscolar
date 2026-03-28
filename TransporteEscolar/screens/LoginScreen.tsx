import React, { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native"

type Props = {
  onLogin: (email: string, password: string) => void
  onRegister: (name: string, email: string, password: string, role: "padre" | "conductor") => void
}

export default function LoginScreen({ onLogin, onRegister }: Props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isRegister, setIsRegister] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mini Uber Escolar</Text>

      {isRegister && (
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />
      )}

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

      {isRegister ? (
        <>
          <Button
            title="CREAR CUENTA (PADRE)"
            onPress={() => {
              if (!name || !email || !password) {
                Alert.alert("Error", "Completa todos los campos")
                return
              }

              onRegister(name, email, password, "padre")
              setIsRegister(false)
            }}
          />

          <View style={styles.space} />

          <Button title="VOLVER A LOGIN" onPress={() => setIsRegister(false)} />
        </>
      ) : (
        <>
          <Button
            title="INICIAR SESIÓN"
            onPress={() => onLogin(email, password)}
          />

          <View style={styles.space} />

          <Button
            title="CREAR CUENTA"
            onPress={() => setIsRegister(true)}
          />
        </>
      )}
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
  space: {
    height: 12,
  },
})