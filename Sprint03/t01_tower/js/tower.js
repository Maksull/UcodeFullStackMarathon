class Building {
  constructor(floors, material, address) {
    this.floors = floors;
    this.material = material;
    this.address = address;
  }

  toString() {
    return [
      `Floors: ${this.floors}`,
      `Material: ${this.material}`,
      `Address: ${this.address}`,
    ].join("\n");
  }
}

class Tower extends Building {
  constructor(floors, material, adress, hasElevator, arcCapacity, height) {
    super(floors, material, adress);
    this.hasElevator = hasElevator;
    this.arcCapacity = arcCapacity;
    this.height = height;
  }

  getFloorHeigth() {
    return this.height / this.floors;
  }

  toString() {
    return [
      super.toString(),
      `Elevator: ${this.hasElevator ? "+" : "-"}`,
      `Arc reactor capacity: ${this.arcCapacity}`,
      `Height: ${this.height}`,
      `Floor height: ${this.getFloorHeigth()}`,
    ].join("\n");
  }
}
