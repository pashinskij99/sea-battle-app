import styles from './App.module.scss'
import {useEffect, useState} from "react";
import {Board} from "../../models/Board";
import {BoardComponent} from "../BoardComponent";

interface AppProps {
}

export const App = ({}: AppProps) => {
  const [myBoard, setMyBoard] = useState<Board>(new Board())
  const [shipsReady, setShipsReady] = useState<boolean>(false)

  const restart = () => {
    const newMyBoard = new Board()

    newMyBoard.initCells()

    setMyBoard(newMyBoard)
  }

  const shoot = (x: number, y: number) => {

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
          shipsReady={shipsReady}
          shoot={shoot}
        />
      </div>

    </div>
  );
}
