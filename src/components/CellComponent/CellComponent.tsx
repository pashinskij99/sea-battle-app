import styles from './CellComponent.module.scss';
import clsx from "clsx";
import {Cell} from "../../models/Cell";

interface CellComponentProps {
  cell: Cell
  addMark: (x: number, y: number) => void
}

export const CellComponent = ({cell, addMark}: CellComponentProps) => (
  <div className={clsx(styles.cell, cell?.mark ? styles.color : '') } onClick={() => addMark(cell.x, cell.y)}>
    {
      cell?.mark?.name === 'miss'
        ? <div>&#183;</div>
        : <span>{cell?.mark?.logo}</span>
    }
  </div>
);
