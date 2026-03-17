class Trip {
  constructor(id, studentName, origin, destination, hour, parentId) {
    this.id = id
    this.studentName = studentName
    this.origin = origin
    this.destination = destination
    this.hour = hour
    this.parentId = parentId
    this.status = "PENDIENTE"
    this.driverId = null
  }
}

export default Trip