import fs from "fs"

const USERS_FILE = "./data/users.json"
const TRIPS_FILE = "./data/trips.json"

export function loadUsers() {
  const data = fs.readFileSync(USERS_FILE)
  return JSON.parse(data)
}

export function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
}

export function loadTrips() {
  const data = fs.readFileSync(TRIPS_FILE)
  return JSON.parse(data)
}

export function saveTrips(trips) {
  fs.writeFileSync(TRIPS_FILE, JSON.stringify(trips, null, 2))
}