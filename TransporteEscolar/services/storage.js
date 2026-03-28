import AsyncStorage from "@react-native-async-storage/async-storage"

export const saveUsers = async (users) => {
  try {
    await AsyncStorage.setItem("users", JSON.stringify(users))
  } catch (e) {
    console.log("Error guardando usuarios", e)
  }
}

export const getUsers = async () => {
  try {
    const data = await AsyncStorage.getItem("users")
    return data ? JSON.parse(data) : []
  } catch (e) {
    console.log("Error leyendo usuarios", e)
    return []
  }
}