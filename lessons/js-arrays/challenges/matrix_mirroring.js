// sc: https://ru.hexlet.io/challenges/js_arrays_matrix_mirroring/instance

// arrays.js
// Реализуйте и экспортируйте по умолчанию функцию getMirrorMatrix, которая принимает
// двумерный массив (матрицу) и возвращает массив, изменённый таким образом, что правая половина
// матрицы становится зеркальной копией левой половины, симметричной относительно вертикальной оси
// матрицы. Для простоты условимся, что матрица всегда имеет чётное количество столбцов и количество
// столбцов всегда равно количеству строк.
const getMirrorMatrixMutate = (matrix) => {
    const { length } = matrix[0];
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < length / 2; x++) {
            matrix[y][length - 1 - x] = matrix[y][x];
        }
    }
    return matrix;
};
const getMirrorRow = (row) => {
    const size = row.length;
    const mirrored = [];

    for (let i = 0; i < size / 2; i += 1) {
        mirrored[i] = row[i];
        mirrored[size - i - 1] = row[i];
    }

    return mirrored;
};
const getMirrorMatrix = (matrix) => {
    const mirroredMatrix = [];
    for (const row of matrix) {
        const mirroredRow = getMirrorRow(row);
        mirroredMatrix.push(mirroredRow);
    }

    return mirroredMatrix;
};
export default getMirrorMatrix;
