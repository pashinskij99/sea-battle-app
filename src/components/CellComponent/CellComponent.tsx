import styles from './CellComponent.module.scss';
import clsx from "clsx";
import {Cell} from "../../models/Cell";
// @ts-ignore
import damageImage from '../../assets/damage.png'
// @ts-ignore
import {ReactComponent as ShipSvg} from '../../assets/ship.svg'

interface CellComponentProps {
  cell: Cell
  addMark: (x: number, y: number) => void
}

export const CellComponent = ({cell, addMark}: CellComponentProps) => (
  <div
    className={clsx(
      styles.cell,
      {[styles.color]: cell?.mark?.name === 'ship' || cell?.mark?.name === 'damage'}
    )}
    onClick={() => addMark(cell.x, cell.y)}
  >
    {
      cell?.mark?.name === 'ship'
        ? <span className={styles.ship}>
            <ShipSvg />
            {/*<img src={ShipSvg} alt="ship"/>*/}
          </span>
        : null
    }
    {
      cell?.mark?.name === 'miss'
        ? <div className={styles.miss}>&#183;</div>
        : <span className={styles.damageWrapper}>
            {cell?.mark?.logo ? <img src={damageImage} alt="damage"/> : ''}
          </span>
    }
  </div>
);
