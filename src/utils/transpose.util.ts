/**
 * Transposes the provided matrix and returns a copy.
 */
export function transpose<T>(matrix: T[][]): T[][] {
  let [row] = matrix;
  return row.map((_value, column) => matrix.map(row => row[column]));
}
