import LinkedList from "../structures/LinkedList"
import Queue from "../structures/Queue"
import Stack from "../structures/Stack"
import HashTable from "../structures/HashTable"
import BinaryTree from "../structures/BinaryTree"
import Graph from "../structures/Graph"
import User from "../models/user"
import Trip from "../models/Trip"

import { saveUsers, getUsers } from "./storage"

class TripManager {
  constructor() {
    this.users = new HashTable()
    this.trips = new LinkedList()
    this.pendingTrips = new Queue()
    this.tripTree = new BinaryTree()
    this.tripHistories = {}
    this.graph = new Graph()

    this.setupGraph()
    this.seedUsers()
  }

  async seedUsers() {
    const storedUsers = await getUsers()

    if (storedUsers.length > 0) {
      storedUsers.forEach(user => {
        this.users.insert(user.email, user)
      })
    } else {
      const parent = new User(1, "Juan Padre", "padre@gmail.com", "1234", "padre")
      const driver = new User(2, "Carlos Conductor", "driver@gmail.com", "1234", "conductor")

      this.users.insert(parent.email, parent)
      this.users.insert(driver.email, driver)

      await saveUsers([parent, driver])
    }
  }

  async registerUser(name, email, password, role) {
    const existing = this.users.get(email)
    if (existing) return null

    const id = Date.now()
    const user = new User(id, name, email, password, role)

    this.users.insert(email, user)

    const allUsers = await getUsers()
    allUsers.push(user)
    await saveUsers(allUsers)

    return user
  }

  login(email, password) {
    const user = this.users.get(email)

    if (!user) return null
    if (user.password !== password) return null

    return user
  }

  setupGraph() {
    this.graph.addVertex("CasaA")
    this.graph.addVertex("CasaB")
    this.graph.addVertex("CasaC")
    this.graph.addVertex("Esquina")
    this.graph.addVertex("Colegio")

    this.graph.addEdge("CasaA", "Esquina")
    this.graph.addEdge("CasaB", "Colegio")
    this.graph.addEdge("CasaC", "Esquina")
    this.graph.addEdge("Esquina", "Colegio")
  }

  requestTrip(studentName, origin, destination, hour, parentId) {
    const id = Date.now()

    const trip = new Trip(id, studentName, origin, destination, hour, parentId)

    this.trips.insert(trip)
    this.pendingTrips.enqueue(trip)
    this.tripTree.insert(trip)

    const history = new Stack()
    history.push("PENDIENTE")
    this.tripHistories[id] = history

    return trip
  }

  getAllTrips() {
    return this.trips.traverse()
  }

  getTripsByParent(parentId) {
    const allTrips = this.trips.traverse()
    return allTrips.filter(trip => trip.parentId === parentId)
  }

  getNextPendingTrip() {
    return this.pendingTrips.peek()
  }

  takeNextTrip(driverId) {
    const trip = this.pendingTrips.dequeue()

    if (!trip) return null

    trip.driverId = driverId
    trip.status = "ASIGNADO"

    this.tripHistories[trip.id].push("ASIGNADO")

    return trip
  }

  updateTripStatus(tripId, newStatus) {
    const trip = this.trips.find(tripId)

    if (!trip) return null

    trip.status = newStatus
    this.tripHistories[trip.id].push(newStatus)

    return trip
  }

  undoLastStatus(tripId) {
    const history = this.tripHistories[tripId]
    const trip = this.trips.find(tripId)

    if (!history || !trip) return null

    history.pop()

    const previousStatus = history.peek()

    if (!previousStatus) return null

    trip.status = previousStatus
    return trip
  }

  getTripHistory(tripId) {
    const history = this.tripHistories[tripId]

    if (!history) return []

    return history.traverse()
  }

  getTripsOrderedByHour() {
    return this.tripTree.inOrder()
  }

  getRoute(origin, destination) {
    return this.graph.bfs(origin, destination)
  }

  deleteTrip(tripId) {
    const trip = this.trips.find(tripId)

    if (!trip) return false

    this.trips.delete(tripId)
    delete this.tripHistories[tripId]

    const remaining = []
    let t = this.pendingTrips.dequeue()

    while (t) {
      if (t.id !== tripId) {
        remaining.push(t)
      }
      t = this.pendingTrips.dequeue()
    }

    remaining.forEach(item => this.pendingTrips.enqueue(item))

    return true
  }

  updateTrip(tripId, newData) {
    const trip = this.trips.find(tripId)

    if (!trip) return null

    trip.studentName = newData.studentName || trip.studentName
    trip.origin = newData.origin || trip.origin
    trip.hour = newData.hour || trip.hour

    return trip
  }
}

export default TripManager