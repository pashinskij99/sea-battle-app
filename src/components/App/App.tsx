import styles from './App.module.scss'
import {useEffect, useState} from "react";
import {Board} from "../../models/Board";
import {BoardComponent} from "../BoardComponent";

export const App = () => {
  const [myBoard, setMyBoard] = useState<Board>(new Board())

  const restart = () => {
    const newMyBoard = new Board()

    newMyBoard.initCells()

    setMyBoard(newMyBoard)
  }

  useEffect(() => {
    restart()
  }, [])

  return (
    <div className={styles.app}>

      <div className={styles.board}>
        <BoardComponent
          board={myBoard}
          setBoard={setMyBoard}
        />
      </div>

    </div>
  );
}
