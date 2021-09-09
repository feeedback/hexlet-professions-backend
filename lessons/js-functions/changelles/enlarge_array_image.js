// sc: https://ru.hexlet.io/challenges/js_functions_enlarge_array_image/instance

// enlargeArrayImage.js

// Реализуйте и экспортируйте по умолчанию функцию enlargeArrayImage, которая принимает
// изображение в виде двумерного массива и увеличивает его в два раза

const duplicateValues = (arr) => arr.flatMap((el) => [el, el]);

const enlargeArrayImage = (matrix) => {
  const horizontallyStretched = matrix.map(duplicateValues);
  return duplicateValues(horizontallyStretched);
};

const enlargeArrayImageReduce = (matrix) =>
  matrix.reduce((acc, row) => {
    const newRow = row.reduce((accRow, e) => [...accRow, e, e], []);
    return [...acc, newRow, newRow];
  }, []);

export default enlargeArrayImage;
