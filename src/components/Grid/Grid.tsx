import "./Grid.scss";
import cn from "classnames";

type GridSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface GridProps {
  container?: boolean;
  row?: boolean;
  column?: boolean;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  children?: React.ReactNode;
  justifyContent?: string;
}

const Grid = ({
  container,
  row,
  column,
  sm,
  md,
  lg,
  justifyContent,
  children,
  ...props
}: GridProps) => {
  const classes = cn({
    //styling for container
    ...(container && { grid: container }),
    //styling for row
    ...(row && { row, "justify-content": justifyContent }),
    //styling for column
    ...(column && {
      column,
      [`md-${md}`]: md,
      [`sm-${sm}`]: sm,
      [`lg-${lg}`]: lg
    })
  });

  return <div className={classes}>{children}</div>;
};

export default Grid;
