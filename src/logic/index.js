export const verificarGanador = (tablero) => {
    // Verificar filas
    for (let fila = 0; fila < tablero.length; fila++) {
        for (let columna = 0; columna < tablero[fila].length - 3; columna++) {
            if (tablero[fila][columna] &&
                tablero[fila][columna] === tablero[fila][columna + 1] &&
                tablero[fila][columna] === tablero[fila][columna + 2] &&
                tablero[fila][columna] === tablero[fila][columna + 3]) {
                return tablero[fila][columna]
            }
        }
    }

    // Verificar columnas
    for (let columna = 0; columna < tablero[0].length; columna++) {
        for (let fila = 0; fila < tablero.length - 3; fila++) {
            if (tablero[fila][columna] &&
                tablero[fila][columna] === tablero[fila + 1][columna] &&
                tablero[fila][columna] === tablero[fila + 2][columna] &&
                tablero[fila][columna] === tablero[fila + 3][columna]) {
                return tablero[fila][columna]
            }
        }
    }

    // Verificar diagonales (de izquierda a derecha)
    for (let fila = 0; fila < tablero.length - 3; fila++) {
        for (let columna = 0; columna < tablero[fila].length - 3; columna++) {
            if (tablero[fila][columna] &&
                tablero[fila][columna] === tablero[fila + 1][columna + 1] &&
                tablero[fila][columna] === tablero[fila + 2][columna + 2] &&
                tablero[fila][columna] === tablero[fila + 3][columna + 3]) {
                return tablero[fila][columna]
            }
        }
    }

    // Verificar diagonales (de derecha a izquierda)
    for (let fila = 0; fila < tablero.length - 3; fila++) {
        for (let columna = 3; columna < tablero[fila].length; columna++) {
            if (tablero[fila][columna] &&
                tablero[fila][columna] === tablero[fila + 1][columna - 1] &&
                tablero[fila][columna] === tablero[fila + 2][columna - 2] &&
                tablero[fila][columna] === tablero[fila + 3][columna - 3]) {
                return tablero[fila][columna]
            }
        }
    }

    return null
}

export const checkEmpate = (tablero) => {
    // Verificar si todas las celdas están ocupadas
    return tablero.every(columna => columna.every(fila => fila !== null))
}