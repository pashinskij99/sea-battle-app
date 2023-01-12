import {Mark} from "./Mark";
import {Cell} from "../Cell";

export class Damage extends Mark{
  constructor(cell: Cell) {
    super(cell);
    this.logo = 'X'
    this.name = 'damage'
    this.color = 'red'
  }
}
