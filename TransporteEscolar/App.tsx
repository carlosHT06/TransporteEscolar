import React, { useMemo, useState } from "react"
import { Alert } from "react-native"

import TripManager from "./services/TripManager"
import LoginScreen from "./screens/LoginScreen"
import ParentScreen from "./screens/ParentScreen"
import DriverScreen from "./screens/DriverScreen"

type User = {
  id: number
  name: string
  email: string
  password: string
  role: "padre" | "conductor"
}

export default function App() {
  const manager = useMemo(() => new TripManager(), [])
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const handleLogin = (email: string, password: string) => {
    const user = manager.login(email, password)

    if (!user) {
      Alert.alert("Error", "Credenciales incorrectas")
      return
    }

    setCurrentUser(user)
  }

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
    role: "padre" | "conductor"
  ) => {
    const user = await manager.registerUser(name, email, password, role)

    if (!user) {
      Alert.alert("Error", "Usuario ya existe")
      return
    }

    Alert.alert("Éxito", "Usuario creado")
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  if (!currentUser) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    )
  }

  if (currentUser.role === "padre") {
    return (
      <ParentScreen
        user={currentUser}
        manager={manager}
        onLogout={handleLogout}
      />
    )
  }

  return (
    <DriverScreen
      user={currentUser}
      manager={manager}
      onLogout={handleLogout}
    />
  )
}