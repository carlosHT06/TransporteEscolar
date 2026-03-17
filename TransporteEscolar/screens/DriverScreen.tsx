import React, { useState } from "react"
import { View, Text, Button, StyleSheet } from "react-native"

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

type DriverScreenProps = {
  user: User
  manager: any
  onLogout: () => void
}

export default function DriverScreen({ user, manager, onLogout }: DriverScreenProps) {
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(manager.getNextPendingTrip())
  const [refresh, setRefresh] = useState(false)

  const handleTakeTrip = () => {
    const trip = manager.takeNextTrip(user.id)
    setCurrentTrip(trip)
    setRefresh(!refresh)
  }

  const handleUpdateStatus = (status: string) => {
    if (!currentTrip) return

    const updatedTrip = manager.updateTripStatus(currentTrip.id, status)

    if (updatedTrip) {
      setCurrentTrip({ ...updatedTrip })
      setRefresh(!refresh)
    }
  }

  const route =
    currentTrip ? manager.getRoute(currentTrip.origin, currentTrip.destination) : null

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla Conductor</Text>
      <Text style={styles.subtitle}>Bienvenido, {user.name}</Text>

      {currentTrip ? (
        <View style={styles.card}>
          <Text>Estudiante: {currentTrip.studentName}</Text>
          <Text>Origen: {currentTrip.origin}</Text>
          <Text>Destino: {currentTrip.destination}</Text>
          <Text>Hora: {currentTrip.hour}</Text>
          <Text>Estado: {currentTrip.status}</Text>
          <Text>Ruta: {route ? route.join(" → ") : "Sin ruta disponible"}</Text>

          <View style={styles.space} />
          <Button title="Marcar RECOGIDO" onPress={() => handleUpdateStatus("RECOGIDO")} />
          <View style={styles.space} />
          <Button title="Marcar COMPLETADO" onPress={() => handleUpdateStatus("COMPLETADO")} />
        </View>
      ) : (
        <Text>No hay viaje actual.</Text>
      )}

      <View style={styles.space} />
      <Button title="Tomar siguiente viaje" onPress={handleTakeTrip} />
      <View style={styles.space} />
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
  card: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  space: {
    height: 10,
  },
})