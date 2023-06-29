function makeMap(cols, rows, chanceToSpawn) {
    const map = []
    for (let x = 0; x < rows; x++) {
        map.push([]);
        for (let y = 0; y < cols; y++) {
            map[x].push(Math.random() < chanceToSpawn ? 1 : 0)
        }
    }

    return map
}