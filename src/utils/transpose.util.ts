/** Transposes the provided matrix and returns a copy */
export function transpose<T>(matrix: T[][]): T[][] {
  const [row] = matrix;
  return row.map((_value, column) => matrix.map(row => row[column]));
}
