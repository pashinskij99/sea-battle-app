import {Board} from "./Board";
import {Mark} from "./marks/Mark";

export class Cell {
  board
  x
  y
  mark
  id
  constructor(board: Board, x: number, y: number, mark: Mark | null) {
    this.board = board
    this.x = x
    this.y = y
    this.mark = mark
    this.id = Math.random()
  }
}
