const blockValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function checkCellValidity(i, j, matrix) {
  let arr = [];

  // Check horizontally
  arr = matrix[i].filter(one => one);
  if (new Set(arr).size !== arr.length) {
    return false;
  }

  // Check vertically
  arr = matrix.map(row => row[j]).filter(one => one);
  if (new Set(arr).size !== arr.length) {
    return false;
  }

  // Check the square

  arr = [];

  const iSqrStart = Math.floor(i / 3) * 3;
  const jSqrStart = Math.floor(j / 3) * 3;

  for (let c1 = iSqrStart; c1 < iSqrStart + 3; c1++) {
    for (let c2 = jSqrStart; c2 < jSqrStart + 3; c2++) {
      arr.push(matrix[c1][c2]);
    }
  }

  arr = arr.filter(one => one);
  if (new Set(arr).size !== arr.length) {
    return false;
  }

  return true;
}

module.exports = function solveSudoku(matrix) {

  // Get possible values

  const p = [];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (matrix[i][j] === 0) {
        const set = new Set(blockValues);

        for (let c = 0; c < 9; c++) {
          set.delete(matrix[i][c]);
          set.delete(matrix[c][j]);
        }

        const iSqrStart = Math.floor(i / 3) * 3;
        const jSqrStart = Math.floor(j / 3) * 3;
        for (let c1 = iSqrStart; c1 < iSqrStart + 3; c1++) {
          for (let c2 = jSqrStart; c2 < jSqrStart + 3; c2++) {
            set.delete(matrix[c1][c2]);
          }
        }

        if (set.size > 0) {
          p.push({ coords: [i, j], values: Array.from(set) });
        }
      }
    }
  }


  // Check all the values

  // Iterator of each p.values array
  const j = p.map(_ => 0);

  // Iterator of p (possible values for each coords) array
  for (let i = 0; i < p.length;) {
    // Check if we passed through all possible values for current coords and need to get next for previous coords
    if (j[i] >= p[i].values.length) {
      j[i] = 0;
      matrix[p[i].coords[0]][p[i].coords[1]] = 0;
      j[--i]++;
      continue;
    }

    matrix[p[i].coords[0]][p[i].coords[1]] = p[i].values[j[i]];

    if (checkCellValidity(...p[i].coords, matrix)) {
      i++;
      continue;
    }

    j[i]++;
  }

  // Matrix is valid
  return matrix;
}
