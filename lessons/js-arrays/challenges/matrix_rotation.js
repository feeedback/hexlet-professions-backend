// sc: https://ru.hexlet.io/challenges/js_arrays_matrix_rotation/instance

// matrix.js
// Реализуйте и экспортируйте функции rotateLeft и rotateRight, которые поворачивают
// матрицу влево (против часовой стрелки) и соответственно вправо (по часовой стрелке).

// Матрица реализована на массивах. Функции должны возвращать новую матрицу не изменяя исходную.

const rotateLeft1 = (matrix) => {
  const rotated = [];
  for (let x = matrix[0].length - 1; x >= 0; x--) {
    const row = [];
    for (let y = 0; y < matrix.length; y++) {
      row.push(matrix[y][x]);
    }
    rotated.push(row);
  }
  return rotated;
};
const rotateRight1 = (matrix) => {
  const rotated = [];
  for (let x = 0; x < matrix[0].length; x++) {
    const row = [];
    for (let y = matrix.length - 1; y >= 0; y--) {
      row.push(matrix[y][x]);
    }
    rotated.push(row);
  }
  return rotated;
};
const rotate = (matrix, direction) => {
  const rowsCount = matrix.length;
  const columnsCount = matrix[0].length;
  const rotated = [];

  for (let x = 0; x < columnsCount; x += 1) {
    rotated[x] = [];
    for (let y = 0; y < rowsCount; y += 1) {
      if (direction === 'left') {
        rotated[x][y] = matrix[y][columnsCount - x - 1];
      } else {
        rotated[x][y] = matrix[rowsCount - y - 1][x];
      }
    }
  }
  return rotated;
};
const rotate0 = (matrix, direction) => {
  const rowsCount = matrix.length;
  const columnsCount = matrix[0].length;
  const rotated = [];

  for (let x = 0; x < columnsCount; x += 1) {
    const row = [];
    for (let y = 0; y < rowsCount; y += 1) {
      if (direction === 'left') {
        row.push(matrix[y][columnsCount - x - 1]);
      } else {
        row.push(matrix[rowsCount - y - 1][x]);
      }
    }
    rotated.push(row);
  }
  return rotated;
};
export const rotateLeft = (matrix) => rotate(matrix, 'left');
export const rotateRight = (matrix) => rotate(matrix, 'right');
