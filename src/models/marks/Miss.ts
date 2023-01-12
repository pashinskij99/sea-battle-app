import {Mark} from "./Mark";
import {Cell} from "../Cell";

export class Miss extends Mark{
  constructor(cell: Cell) {
    super(cell);

    this.logo = null
    this.name = 'miss'
    this.color = 'blue'
  }
}
