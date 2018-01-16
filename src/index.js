module.exports = function isCircuitClosed(matrix) {
  const arr = matrix;

  let result = false;

  const [ x, y ] = [ arr[0].length, arr.length ];

  const neighbors = (i, j, limitX, limitY) => {
    return [
      [i - 1, j - 1],
      [i + 1, j - 1],
      [i + 1, j + 1],
      [i - 1, j + 1],
    ].filter(n => (n[0] > -1 && n[0] < limitX) &&
                  (n[1] > -1 && n[1] < limitY) &&
                  arr[n[0]][n[1]] === 1
            );
  }

  const tree = [];

  for ( let i = 0; i < y; i++) {
    for ( let j = 0; j < x; j++) {
      const nb = neighbors(i, j, y, x);
      const data = arr[i][j];
      if (data === 1 && nb.length > 0) {
        tree.push(
          {
            color: 'white',
            index: [i, j],
            data,
            neighbors: nb,
          }
        );
      }
    }
  }

  const findNodeByIndex = ind => {
    for ( let i = 0; i < tree.length; i++) {
      if (tree[i].index[0] == ind[0] && tree[i].index[1] == ind[1]) {
        return tree[i];
      }
    }
    return null;
  }

  const dfs = (node, parent) => {
    if (result) {
      return;
    }
    node.color = 'gray';
    for ( let i = 0; i < node.neighbors.length; i++) {
      const nd = findNodeByIndex(node.neighbors[i]);
      if (nd.index[0] === parent.index[0] && nd.index[1] === parent.index[1]) {
        continue;
      }
      if (nd.color === 'white') {
        dfs(nd, node);
      }
      if (nd.color === 'gray') {
        result = true;
      }
    }
    findNodeByIndex(node.index).color = 'black';
  }


  for ( let i = 0; i < tree.length; i++) {
    dfs(tree[i], tree[i]);
  }

  return result;

}
