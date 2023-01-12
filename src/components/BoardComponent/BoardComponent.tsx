import styles from './BoardComponent.module.scss'
import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import { Board } from '../../models/Board'
import { CellComponent } from '../CellComponent'

interface BoardComponentProps {
    board: Board
    setBoard: React.Dispatch<React.SetStateAction<Board>>
    shoot: (x: number, y: number) => void
    shipsReady: boolean
}

export const BoardComponent = ({ setBoard, board }: BoardComponentProps) => {
    const [isReady, setReady] = useState(false)
    const [shipsCoordinate, setShipsCoordinate] = useState<string[]>([])

    const updateBoard = () => {
        const newBoard = board.getCopyBoard()

        setBoard(newBoard)
    }

    const update = () => {
        const newBoard = board.getUpdate()

        setBoard(newBoard)
    }

    const addMark = (x: number, y: number) => {
        const convertCoordinateToString = String(x) + String(y)

        if(shipsCoordinate.includes(convertCoordinateToString)) board.addDamage(x, y)
        else board.addMiss(x, y)

        update()
    }

    const randomShips = () => {
        updateBoard()
        setShipsCoordinate(board.randomShips())
    }

    useEffect(() => {
        setReady(true)
        randomShips()
    }, [isReady])

    return (
      <div className={styles.wrapper}>
          <h1 className={styles.title}>Sea battle</h1>

          <div className={clsx(styles.board, styles.activeShoot)}>
              {board.cells.map((row, index) => (
                <React.Fragment key={index}>
                    {row.map((cell) => (
                      <CellComponent
                        key={cell.id}
                        cell={cell}
                        addMark={addMark}
                      />
                    ))}
                </React.Fragment>
              ))}
          </div>

          <button className={styles.btn} onClick={randomShips}>Random Ships</button>
      </div>
    )
}
