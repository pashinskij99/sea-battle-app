import {Cell} from "../Cell";

export class Mark {
  cell: Cell
  logo: string | null
  color: string | null
  id: number
  name: 'ship' | 'miss' | 'damage' | ''
  
  constructor(cell: Cell) {
    this.cell = cell
    this.cell.mark = this
    this.logo = null
    this.color = null
    this.id = Math.random()
    this.name = ''
  }
}
