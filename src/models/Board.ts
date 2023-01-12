import {Cell} from "./Cell";
import {Ship} from "./marks/Ship";
import {Miss} from "./marks/Miss";
import {Damage} from "./marks/Damage";

let privateUserLocation: string[] = []

export class Board {
  cells: Cell[][] = []
  ships: string[] = []

  shipCount: number[] = [1, 2, 3, 4] // array of number of ships
  shipSize: number[] = [4, 3, 2, 1] // an array of types of ships 4-deck, 3-deck ...

  generateShips() {
    let privateLocation: string[] // area around the ship where you can not put a new one
    privateLocation = privateUserLocation
    const ships: string[][] = []

    // use template for ship (object)
    this.shipCount.forEach(( count, index) => {
      const size = this.shipSize[index]

      for(let i = 0; i < count; i++) {
        const ship = this.generateShipOptions(size, privateLocation)

        ships.push(ship)
      }
    })

    return ships
  }

  // method created object of ship
  generateShipOptions(shipSize: number, privateLocation: string[]): string[] {
    const ship: string[] = []
    const direction = Math.random() < .5 // generate direction ship
    let x, y

    // depending on the direction of the ship, its coordinates are generated
    if( direction ) {
      x = Math.floor(Math.random() * 10)
      y = Math.floor(Math.random() * (10 - shipSize) )
    } else {
      x = Math.floor(Math.random() * (10 - shipSize))
      y = Math.floor(Math.random() * 10 )
    }

    // coordinates are added to the ship's location field
    for (let i = 0; i < shipSize; i ++) {
      if( direction ) { // horizontal
        ship.push(x + '' + (y + i))
      } else { // vertical
        ship.push((x + i) + '' + y)
      }
    }

    // checking for a safe area around the ship
    if(this.checkPrivateLocation(ship, privateLocation)) {
      return this.generateShipOptions(shipSize, privateLocation)
    }
    // add protected from the placement of the ship, cells to the array for storage
    this.addPrivateLocation(ship, privateLocation)

    return ship
  }

  checkPrivateLocation(location: string[], privateLocation: string[]) {
    for(const coordinate of location) {
      if (privateLocation.includes(coordinate)) {
        return true
      }
    }
  }

  addPrivateLocation(location: string[], privateLocation: string[]) {
    for(let i = 0; i < location.length; i++) {
      // @ts-ignore
      const startCoordinateX = location[i][0] - 1
      // @ts-ignore
      const startCoordinateY = location[i][1] - 1
      for(let j = startCoordinateX; j < startCoordinateX + 3; j++) {
        for(let r = startCoordinateY; r < startCoordinateY + 3; r++) {
          if( j >= 0 && j < 10 && r >= 0 && r < 10 ) {
            const coordinate = j + '' + r
            if(!privateLocation.includes(coordinate)){
              privateLocation.push(coordinate)
            }
          }
        }
      }
    }
  }

  //

  initCells () {
    for (let i = 0; i < 10; i++) {
      const row: Cell[] = []

      for (let j = 0; j < 10; j++) {
        row.push(new Cell(this, j, i, null))
      }

      this.cells.push(row)
    }
  }

  getCopyBoard(): Board{
    // remove last point before new board
    if(privateUserLocation.length > 0) privateUserLocation = []

    this.cells = []

    this.initCells()

    const newBoard = new Board()
    newBoard.cells = this.cells

    return newBoard
  }

  getUpdate(): Board{
    const newBoard = new Board()
    newBoard.cells = this.cells

    return newBoard
  }

  getCells(x: number, y: number) {
    return this.cells[y][x]
  }

  addShip(x: number, y: number){
    new Ship(this.getCells(x, y))
  }

  addMiss(x: number, y: number) {
    new Miss(this.getCells(x, y))
  }

  addDamage(x: number, y: number) {
    new Damage(this.getCells(x, y))
  }

  randomShips(): string[] {

    const ships = this.generateShips()

    for (let i = 0; i < ships.length; i++) {
      for (let j = 0; j < ships[i].length; j++) {
        const coordinate = ships[i][j].split('')

        this.ships.push(ships[i][j])
        this.addShip(+coordinate[0], +coordinate[1])
      }
    }

    return this.ships
  }
}
