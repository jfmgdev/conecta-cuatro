export const Celda = ({ index, casilla, filaIndex, handleClick }) => {
    // Usar useCallback para la función si es posible, o...
    const filaData = `${index}-${filaIndex}`;

    return (
        <div
            className={`celda ficha-${casilla}`}
            data-fila={filaData}
            onClick={() => handleClick(filaData)}
        >
        </div>
    )
}