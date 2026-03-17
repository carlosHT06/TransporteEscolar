import React, { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from "react-native"

type User = {
  id: number
  name: string
  email: string
  password: string
  role: "padre" | "conductor"
}

type Trip = {
  id: number
  studentName: string
  origin: string
  destination: string
  hour: number
  parentId: number
  status: string
  driverId: number | null
}

type ParentScreenProps = {
  user: User
  manager: any
  onLogout: () => void
}

export default function ParentScreen({ user, manager, onLogout }: ParentScreenProps) {
  const [studentName, setStudentName] = useState("")
  const [origin, setOrigin] = useState("")
  const [hour, setHour] = useState("")
  const [refresh, setRefresh] = useState(false)

  const trips: Trip[] = manager.getTripsByParent(user.id)
  const validOrigins = ["CasaA", "CasaB", "CasaC"]

  const handleRequestTrip = () => {
    const cleanOrigin = origin.trim()

    if (!studentName || !cleanOrigin || !hour) {
      Alert.alert("Error", "Completa todos los campos")
      return
    }

    if (!validOrigins.includes(cleanOrigin)) {
      Alert.alert("Error", "El origen debe ser CasaA, CasaB o CasaC")
      return
    }

    manager.requestTrip(studentName, cleanOrigin, "Colegio", Number(hour), user.id)

    setStudentName("")
    setOrigin("")
    setHour("")
    setRefresh(!refresh)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla Padre</Text>
      <Text style={styles.subtitle}>Bienvenido, {user.name}</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del estudiante"
        value={studentName}
        onChangeText={setStudentName}
      />

      <TextInput
        style={styles.input}
        placeholder="Origen (CasaA, CasaB, CasaC)"
        value={origin}
        onChangeText={setOrigin}
      />

      <TextInput
        style={styles.input}
        placeholder="Hora (ejemplo: 7)"
        keyboardType="numeric"
        value={hour}
        onChangeText={setHour}
      />

      <Button title="Solicitar viaje" onPress={handleRequestTrip} />

      <Text style={styles.section}>Mis viajes</Text>

      <FlatList
        data={trips}
        extraData={refresh}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Estudiante: {item.studentName}</Text>
            <Text>Origen: {item.origin}</Text>
            <Text>Hora: {item.hour}</Text>
            <Text>Estado: {item.status}</Text>
          </View>
        )}
      />

      <Button title="Cerrar sesión" onPress={onLogout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  section: {
    fontSize: 20,
    marginVertical: 15,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
})