import {Mark} from "./Mark";
import {Cell} from "../Cell";

export class Ship extends Mark{
  constructor(cell: Cell) {
    super(cell);
    this.logo = null
    this.name = 'ship'
    this.color = 'grey'
  }



}
